import { LevelAccessService } from "./../../../services/global/level-access.service";
import { StorageService } from "./../../../services/storage/storage.service";
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { interval } from "rxjs";
import { IBed } from "src/app/models/beds";
import { IMonitoring, IMonitoringSocket } from "src/app/models/monitoring";
import { ConfigMonitoringChannelService } from "src/app/services/monitoring/config-monitoring-channel.service";
import { MonitoringService } from "src/app/services/monitoring/monitoring.service";
export interface IConfigCurve {
  equipment: any;
  name: any;
  array: any[];
  colorLine: any;
  hertz: any;
  secs: any;
  min: number;
  max: number;
}

@Component({
  selector: "app-bed-display",
  templateUrl: "./bed-display.component.html",
  styleUrls: ["./bed-display.component.scss"],
})
export class BedDisplayComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private monitoringService: MonitoringService,
    private configMS: ConfigMonitoringChannelService,
    private storage: StorageService,
    private levelAccess: LevelAccessService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        setTimeout(() => {
          this.monitoring_id = Number(
            this.route.snapshot.paramMap.get("id") || 0
          );
          this.getBedsById(true);
        }, 100);
      }
    });
  }

  @ViewChild("sizeCurves") sizeCurves!: ElementRef;

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.refreshCurves = false;
    const width = this.sizeCurves?.nativeElement.offsetWidth;
    this.widthCurves = width;

    // Defina uma relação para ajustar hertz e secs com base na largura
    const larguraBase = 1000; // Largura de referência
    this.fatorAjuste = width / larguraBase;

    setTimeout(() => {
      this.refreshCurves = true;
    }, 10);
  }

  loading = true;
  refresh = true;
  refreshCurves = true;

  monitoring_id: any = -1;
  bid_id: any = -1;
  monitorings: IMonitoring[] = [] as IMonitoring[];
  results: any[] = [];

  curvesEDAN: IConfigCurve[] = [];
  curvesMP40: IConfigCurve[] = [];

  end_date: Date = new Date();
  start_date: Date = new Date();
  delay = 0;

  listDelay: any = [];
  isPNIorPI = false;

  listZero = Array(100).fill(0);

  user = this.storage.myself;
  level_access: any;
  trends_access = this.levelAccess.checkLevelAccess("trends");

  widthCurves = 0;

  fatorAjuste = 1;

  socketMonitor = new WebSocket(`ws://54.207.148.13/wave_simulator/`);

  ngOnInit() {
    this.level_access = this.user.level_access.filter(
      (el) => el.name === "Monitoramento"
    );

    if (this.level_access.length > 0) this.level_access = this.level_access[0];

    this.monitoring_id = Number(this.route.snapshot.paramMap.get("id") || 0);

    this.getBedsById(true);

    interval(this.configMS.timeRefresh * 1000).subscribe(() => {
      this.getBedsById(false);
    });

    this.conectionMonitoringSocket();
  }

  ngOnDestroy() {
    this.listDelay.forEach((delay: any) => {
      clearInterval(delay.timer);
    });

    this.listDelay = [];
  }

  conectionMonitoringSocket() {
    this.socketMonitor.addEventListener("open", function (event) {
      // console.clear();
      // console.log("\n----- WebSocket connection -----\n");
      // console.log(event.target);
    });

    this.socketMonitor.addEventListener("message", (event: MessageEvent) => {
      const res_socket = JSON.parse(event.data);
      // console.log("Monitor\n", res_socket, "\n\n");

      const time: any = this.listDelay.filter(
        (el: any) => el.equipment === res_socket?.equipment
      );

      if (time && time.length > 0) {
        time[0].end_date = new Date(res_socket.end_date);
        time[0].start_date = new Date(res_socket.start_date);
        time[0].delay =
          new Date().getTime() - new Date(res_socket.start_date).getTime();
      } else {
        this.listDelay.push({
          equipment: res_socket?.equipment,
          end_date: new Date(res_socket.end_date),
          start_date: new Date(res_socket.start_date),
          delay:
            new Date().getTime() - new Date(res_socket.start_date).getTime(),
          timer: 0,
        });
      }

      if (res_socket?.waves) {
        this.startsProcessingTheCurves(res_socket);
      }

      this.monitorings.forEach((el) => {
        if (el.id === res_socket.id) {
          el.params = res_socket.params;
          el.equipment = res_socket.equipment;
        }
      });

      this.checkAndUpdate(true, res_socket?.equipment);
    });
  }

  setSecsCurves(secs: number) {
    if (this.fatorAjuste === 0) {
      this.refreshCurves = false;
      const width = this.sizeCurves?.nativeElement.offsetWidth;
      this.widthCurves = width;

      // Defina uma relação para ajustar hertz e secs com base na largura
      const larguraBase = 1000; // Largura de referência
      this.fatorAjuste = width / larguraBase;

      setTimeout(() => {
        this.refreshCurves = true;
      }, 10);
    }

    // Ajuste secs proporcionalmente
    return Math.round(secs * this.fatorAjuste);
  }

  startsProcessingTheCurves(monitorSocket: IMonitoringSocket) {
    const _waves: any[] = this.configMS.separateObjectFromArray(
      monitorSocket.waves
    );
    // Loop de variáveis de objeto
    _waves.forEach((wave: any) => {
      const channel = this.configMS.setConfigChannel(wave.name);

      if (monitorSocket.equipment === 2) {
        this.setArrayCurvesEDAN(channel, monitorSocket, wave);
      } else {
        this.setArrayCurvesMP40(channel, monitorSocket, wave);
      }
    });

    this.checkAndUpdate(true, monitorSocket.equipment);
  }

  setArrayCurvesEDAN(channel: any, monitorSocket: any, wave: any) {
    const arrayFirstEDAN: IConfigCurve[] = this.curvesEDAN.filter(
      (el: any) => el.name === channel.name
    );
    if (arrayFirstEDAN.length > 0) {
      // arrayFirstEDAN[0].array.push(12345678);
      // arrayFirstEDAN[0].array.push(-12345678);
      arrayFirstEDAN[0].array.push(...wave.data);

      const maxLength = wave.data.length * 5;
      if (arrayFirstEDAN[0].array.length > maxLength) {
        // arrayFirstEDAN[0].array.splice(0, arrayFirstEDAN[0].array.length - maxLength);
      }
    } else {
      const yMin = Math.min(...wave.data);
      const yMax = Math.max(...wave.data);

      this.curvesEDAN.push({
        equipment: monitorSocket.equipment,
        name: channel.name,
        array: wave.data,
        colorLine: channel.color,
        hertz: channel.hertz,
        secs: channel.secs,
        min: yMin,
        max: yMax,
      });
    }
  }

  setArrayCurvesMP40(channel: any, monitorSocket: any, wave: any) {
    // if (!wave) return;
    const arrayFirstMP40: IConfigCurve[] = this.curvesMP40.filter(
      (el: any) => el.name === channel.name
    );
    if (arrayFirstMP40.length > 0) {
      // arrayFirstMP40[0].array.push(12345678);
      // arrayFirstMP40[0].array.push(-12345678);
      arrayFirstMP40[0].array.push(...wave.data);

      const maxLength = wave.data.length * 5;
      if (arrayFirstMP40[0].array.length > maxLength) {
        arrayFirstMP40[0].array.splice(
          0,
          arrayFirstMP40[0].array.length - maxLength
        );
      }
    } else {
      const yMin = Math.min(...wave.data);
      const yMax = Math.max(...wave.data);

      if (["I", "II", "III", "plenth", "RESP"].includes(channel.name)) {
        this.curvesMP40.push({
          equipment: monitorSocket.equipment,
          name: channel.name,
          array: wave.data,
          colorLine: channel.color,
          hertz: channel.hertz,
          secs: channel.secs,
          min: yMin,
          max: yMax,
        });
      }
    }
  }

  addZeroValues(): void {
    this.curvesEDAN.forEach((el) => {
      const avg = this.configMS.findMostRepeatedNumber(el.array);
      el.array.splice(0, el.array.length);
      for (let i = 0; i < 100; i++) {
        el.array.push(avg);
      }
    });

    this.curvesMP40.forEach((el: any) => {
      const avg = this.configMS.findMostRepeatedNumber(el.array);
      el.array.splice(0, el.array.length);
      for (let i = 0; i < 100; i++) {
        el.array.push(avg);
      }
    });
  }

  getBedsById(status: boolean) {
    if (!this.monitoring_id || this.monitoring_id === -1) return;

    this.loading = status;

    this.monitoringService.getNewBedsById(this.monitoring_id).subscribe(
      (data: any) => {
        if (status) {
          this.monitorings = data;

          if (data.length > 0) {
            this.bid_id = Number(
              (data[0].equipment && data[0].equipment[0]?.id) || 0
            );

            this.isPNIorPI =
              data[0].params.filter((el: any) =>
                ["PNI", "PI"].includes(el.label)
              ).length > 0;
          }
        }
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  checkQtd(qtd = 0, idx: number) {
    let classe = "";

    if (this.results[idx]?.size === "big") {
      classe = " big";
    }

    if (this.isPNIorPI) {
      return "w-30" + classe;
    } else if (
      (this.results[idx]?.channel === "PNI" ||
        this.results[idx]?.channel === "PI") &&
      qtd >= 4 &&
      idx <= 2
    ) {
      return "w-50" + classe;
    } else if (qtd === 1) return "w-100" + classe;
    else if (qtd === 2 || qtd === 4) return "w-50" + classe;
    else if (qtd > 3) return "w-30" + classe;
    else return "w-50" + classe;
  }

  checkTimeUpdate(monitoring: IBed) {
    const startTime = new Date(monitoring.updated_at || "");
    const currentTime = new Date();
    const MILLISECONDS_PER_MINUTE = 60 * 1000;
    const differenceInMinutes = Math.floor(
      (currentTime.getTime() - startTime.getTime()) / MILLISECONDS_PER_MINUTE
    );
    if (monitoring.equipments && monitoring.equipments.length > 0) {
      monitoring.equipments.forEach((element) => {
        if (differenceInMinutes >= 5) {
          element.status = "Offline";
        }
      });
    }
  }

  setListMeasurements(
    title: string,
    num_value: any,
    color: string,
    size: string,
    status: string
  ) {
    const value =
      typeof num_value === "string"
        ? num_value
        : title === "Temp(°C)"
        ? num_value.toFixed(1)
        : num_value.toFixed(0);

    return { title, value, color, size, status };
  }

  redirectToConfig() {
    this.router.navigate([
      `/monitoring/detail/${this.monitorings[0].id}/config`,
    ]);
  }

  // Função para verificar a diferença e mostrar o alerta
  private checkAndUpdate(status = true, monitorSocketId: any): void {
    const time: any = this.listDelay.filter(
      (el: any) => el.equipment === monitorSocketId
    );

    if (time && time.length > 0) {
      const diff = time[0].end_date.getTime() - time[0].start_date.getTime();

      const now = new Date();
      const differenceInSeconds = now.getTime() - time[0].end_date.getTime();

      if (differenceInSeconds > diff + time[0].delay) {
        // console.log(
        //   "\n DESATUALIZADO - " + this.setTime(time[0].end_date) + "\n\n"
        // );

        // clearTimeout(time[0].timer);
        this.addZeroValues();
      } else {
        // console.log(
        //   "\n ATUALIZADO - " + this.setTime(time[0].end_date) + "\n\n"
        // );
      }

      if (status) {
        // Defina um novo timeout para verificar novamente após {{time}} segundos
        time[0].timer = setTimeout(() => {
          this.checkAndUpdate(true, monitorSocketId);
        }, 1000);
      }
    }
  }

  setTime(time: any) {
    return `${time.getHours()}h ${time.getMinutes()}m ${time.getSeconds()}s`;
  }
}
