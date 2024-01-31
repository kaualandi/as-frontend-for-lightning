import {
  Input,
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  HostListener,
  ElementRef,
} from "@angular/core";
import { IChannel } from "src/app/models/equipment";
import {
  IMonitoring,
  IMonitoringSocket,
  ITriggerAlarm,
} from "src/app/models/monitoring";
import { ConfigMonitoringChannelService } from "src/app/services/monitoring/config-monitoring-channel.service";

@Component({
  selector: "app-card-mode-curves",
  templateUrl: "./card-mode-curves.component.html",
  styleUrls: ["./card-mode-curves.component.scss"],
})
export class CardModeCurvesComponent implements OnInit, OnChanges {
  @Input() bed!: IMonitoring;
  @Input() channels!: IChannel[];
  @Input() status = "Online";
  @Input() limit = 0;

  @Input() hertz!: number;
  @Input() secs!: number;

  @Output() eventAlarm = new EventEmitter<ITriggerAlarm>();

  constructor(public configMS: ConfigMonitoringChannelService) {}

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

  refreshCurves = true;
  widthCurves = 0;
  fatorAjuste = 1;

  newChannels: any[] = [];
  listChannels: any[] = [];

  haveCurves = ["ECG", "SPO2", "RESP", "PI"];
  listCurves: any[] = [];

  ngOnChanges() {
    this.newChannels = this.configMS.setArrayParams(this.channels, this.limit);

    this.newChannels = this.newChannels.map((el) => {
      const index = this.haveCurves.findIndex(
        (item: any) => item === el.channel
      );

      if (index !== -1) {
        el.haveCurves = true;
        el.curves = [];
      } else {
        el.haveCurves = false;
        el.curves = [];
      }

      return el;
    });

    this.setListChannels(this.newChannels.length);

    setTimeout(() => {
      this.newChannels = this.configMS.orderHaveCurves(this.newChannels);
      this.setListChannels(this.newChannels.length);
    }, 10);
  }

  ngOnInit(): void {
    this.newChannels = this.configMS.setArrayParams(this.channels, this.limit);

    this.newChannels = this.newChannels.map((el) => {
      const index = this.haveCurves.findIndex(
        (item: any) => item === el.channel
      );

      if (index !== -1) {
        el.haveCurves = true;
        el.curves = [];
      } else {
        el.haveCurves = false;
        el.curves = [];
      }

      return el;
    });

    this.setListChannels(this.newChannels.length);

    this.configMS.watchSocket().subscribe({
      next: (res) => {
        
        const monitorSocket: IMonitoringSocket = this.configMS.getCurveById(
          this.bed?.equipment[0]?.id || 0
        );

        if (!monitorSocket) return;

        if (monitorSocket?.waves) {
          monitorSocket?.waves.forEach((wave: any) => {
            const channel = this.configMS.setConfigChannel(wave.name);

            const aux: any = this.listCurves.filter(
              (el) => el.name === wave.name
            );

            if (aux.length > 0) {
              if (aux[0].data && aux[0].data.length > wave.data.length * 3) {
                aux[0].data.splice(0, wave.data.length);
              }
              aux[0].data.push(...wave.data);
            } else {
              this.listCurves.push({
                name: wave.name,
                data: wave.data || [],
                color: channel.color,
              });
            }
          });

          setTimeout(() => {
            this.newChannels = this.configMS.orderHaveCurves(this.newChannels);            
            this.setListChannels(this.newChannels.length);
          }, 100);
        }
      },
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
  
  triggerAlarm(event: ITriggerAlarm) {
    this.eventAlarm.emit(event);
  }

  setListChannels(qtd: number) {
    // const init = 0;
    // const end = qtd >= 2 ? 2 : 2;
    // const index = this.listChannels.length;

    // if (this.newChannels.length === 1) {
    //   this.listChannels.push(this.newChannels.slice(init, 1));
    //   this.listChannels.splice(0, index);
    // } else {
    //   this.listChannels.push(this.newChannels.slice(init, end));
    //   this.listChannels.push(this.newChannels.slice(init + end, end * 2));
    //   this.listChannels.splice(0, index);
    // }
  }

  setArray(variable: any, array: any, newArray: any) {
    const auxArray = newArray.map((item: any) => {
      return Number(item[variable]);
    });

    array.splice(0, array.length);
    auxArray.forEach((element: any) => {
      array.push(element);
    });

    if (array.length > newArray.length * 3) {
      array.splice(0, newArray.length);
    }
  }
}
