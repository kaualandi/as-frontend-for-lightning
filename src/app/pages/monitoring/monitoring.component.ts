import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Location } from "@angular/common";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, interval, startWith } from "rxjs";
import { IBed } from "src/app/models/beds";
import { IMonitoring } from "src/app/models/monitoring";
import { BedsService } from "src/app/services/beds/beds.service";
import { ConfigMonitoringChannelService } from "src/app/services/monitoring/config-monitoring-channel.service";
import { MonitoringService } from "src/app/services/monitoring/monitoring.service";
import { StorageService } from "src/app/services/storage/storage.service";

@Component({
  selector: "app-monitoring",
  templateUrl: "./monitoring.component.html",
  styleUrls: ["./monitoring.component.scss"],
})
export class MonitoringComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private storage: StorageService,
    private fb: FormBuilder,
    private monitoringService: MonitoringService,
    private bedsService: BedsService,
    private location: Location,
    private router: Router,
    public route: ActivatedRoute,
    private configMS: ConfigMonitoringChannelService
  ) {
    this.url = this.router.url;
  }

  @Output() eventChild: EventEmitter<any> = new EventEmitter();

  loading = true;
  url: any;
  monitors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  status = ["Ativo", "Alarmando", "Silenciado", "Desativado", "Falha"];
  hidden = false;
  is_list_visible_beds = false;
  is_visible_navbar = true;
  is_visible_aside = true;

  beds: IBed[] = [];
  monitorings: IMonitoring[] = [];
  search_form = this.fb.group({
    search_name: [""],
    search_status: [""],
  });

  socketCurves = new WebSocket(`ws://54.207.148.13/wave_simulator/`);
  socketMonitor = new WebSocket(
    "wss://socketdev.skopien.com.br/monitor_param/"
  );

  isSetting: any;

  ngAfterViewInit() {
    setTimeout(() => {
      // this.handleToggleNavbar();
    }, 1000);
  }

  ngOnInit(): void {
    this.conectionCurvesSocket();
    this.conectionMonitoringSocket();

    this.searchListener();
    this.getMonitorings();

    this.isSetting = this.storage.mysetting;

    this.monitoringService.watchOrder().subscribe({
      next: () => {
        this.searchListener();
        this.getMonitorings();
      },
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.beds, event.previousIndex, event.currentIndex);

    const array: any = [];
    this.beds.forEach((el: any) => {
      array.push(el.id);
    });

    this.saveOrder({ beds: array });
  }

  saveOrder(array: any) {
    this.bedsService.posOrderBeds(array).subscribe(
      (data) => {
        this.monitoringService.changeOrder();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  conectionCurvesSocket() {
    // this.socketCurves.addEventListener("open", function (event) {
    //   console.clear();
    // console.log("\n----- WebSocket connection -----\n");
    // });

    this.socketCurves.addEventListener("message", (event: MessageEvent) => {
      // console.log(event.data);

      // console.log("\n----- WebSocket connection -----\n");
      const res_socket = JSON.parse(event.data);
      const id = this.url.split("/")[3];

      if (res_socket.equipment !== Number(id)) return;
      // console.log("S-Curvas\n", res_socket, "\n");
      console.log(res_socket.equipment);

      let check;
      // if (res_socket.equipment !== 90) {
      //   // console.log("ENTROU CONDIÇÃO EQUIPAMENTO");
      //   return;
      // }

      clearTimeout(this.configMS.timer); // essa função impede que o código seja executado dentro do setTimeout
      this.configMS.timer = setTimeout(() => {
        this.checkEventRequest();
        this.configMS.timer = null;
      }, this.configMS.limitTime);
      this.configMS.clearShart = false;

      if (this.configMS.startCurves)
        console.log(
          "Conteúdo restante",
          event.data.length,
          this.configMS.contentRest
        );

      // ORIGINAL ---- \/
      this.configMS.changeSocket(res_socket);
    });
  }

  checkEventRequest() {
    console.log(
      "Tempo limite atingido. Nenhuma mensagem recebida em 1 minuto."
    );
    this.configMS.clearShart = true;
    // Código a ser executado quando o tempo limite é atingido
  }

  conectionMonitoringSocket() {
    this.socketMonitor.addEventListener("open", function (event) {
      //   console.clear();
      //   console.log("\n----- WebSocket connection -----\n");
    });
    this.socketMonitor.addEventListener("message", (event: MessageEvent) => {
      const res_socket = JSON.parse(event.data);
      // console.log("S-Monitor\n", res_socket, "\n\n");

      this.searchListener();

      this.monitorings.forEach((el) => {
        if (el.id === res_socket.id) {
          el.params = res_socket.params;
          el.equipment = res_socket.equipment;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.socketCurves.close();
    this.socketMonitor.close();
  }

  searchListener() {
    this.search_form.valueChanges
      .pipe(debounceTime(500), startWith(""), distinctUntilChanged())
      .subscribe({
        next: (value: any) => {
          this.getListBeds(
            1,
            value.search_name,
            value?.search_status?.toUpperCase() || ""
          );
        },
      });
  }

  getListBeds(page: number, bed = "", status?: string) {
    const filters = {
      name: this.search_form.value.search_name || "",
      status: this.search_form.value.search_status || "",
    };

    Object.keys(filters).forEach((key) => {
      if (!filters[key as keyof typeof filters]) {
        delete filters[key as keyof typeof filters];
      }
    });

    this.bedsService.getBeds(page, 100000, bed, "", {}, "", status).subscribe(
      (data: any) => {
        // this.beds = data.results;
        this.beds = this.orderList(data.results);

        this.beds = this.beds.map((el: any, idx: any) => {
          return el;
        });

        setTimeout(() => {
          this.loading = false;
        }, 250);
      },
      () => {
        this.loading = false;
      }
    );
  }

  orderList(list: any[]) {
    return list.sort((a, b) => {
      const statusA = ["ATIVO"].includes(a.status?.toUpperCase());
      const statusB = ["ATIVO"].includes(b.status?.toUpperCase());

      if (statusA && !statusB) {
        return -1;
      }
      if (!statusA && statusB) {
        return 1;
      }

      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }

      return 0;
    });
  }

  getMonitorings() {
    this.monitoringService.getNewMonitoringsAll().subscribe(
      (data: any) => {
        // Tratamento da lista de monitores
        const arrayMonitor: IMonitoring[] =
          this.configMS.changeMonitorStatusToOffline(data, 0);

        // Cria o typeView na lista inicializando como false.
        this.monitorings = arrayMonitor.map((el: any, idx: any) => {
          el.typeView = false;
          return el;
        });

        this.monitorings = this.orderMonitoring(this.monitorings);

        // Salva no projeto a lista.
        this.monitoringService.setMonitoring(this.monitorings);
        this.monitoringService.changeMonitoring();
        setTimeout(() => {
          this.loading = false;
        }, 250);
      },
      () => {
        this.loading = false;
      }
    );
  }

  // playSound() {
  //   if(!this._activeMonitorsParameters){
  //     if (this.monitorService.beepSound) {
  //       let audioBip = new Audio();
  //       audioBip.src = '../assets/beep-07a.mp3';
  //       audioBip.load();
  //       audioBip.play();
  //     }
  //   }
  // }

  orderMonitoring(list: any[]) {
    return list.sort((a, b) => {
      if (Number(a.order) < Number(b.order)) {
        return -1;
      }
      if (Number(a.order) > Number(b.order)) {
        return 1;
      }
      return 0;
    });
  }

  handleToggleNavbar() {
    this.is_visible_navbar = !this.is_visible_navbar;
    this.storage.changeNavbar();
  }

  handleToggleAside() {
    this.is_visible_aside = !this.is_visible_aside;
    this.storage.changeAside();
  }

  openBedDisplay(bed: any) {
    this.router.navigate([`/bed-display/${bed.id}`]);
  }

  onSidebarItemClick(id: number) {
    // console.log(id);
  }

  eventComponent(event: any) {
    // console.log(event);
  }

  back() {
    this.location.back();
  }

  next() {
    this.location.forward();
  }
}
