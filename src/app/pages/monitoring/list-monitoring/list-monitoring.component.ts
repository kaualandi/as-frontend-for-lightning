/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-empty-function */
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from "@angular/core";
import { IMonitoring, ITriggerAlarm } from "src/app/models/monitoring";
import { BedsService } from "src/app/services/beds/beds.service";
import { ConfigMonitoringChannelService } from "src/app/services/monitoring/config-monitoring-channel.service";
import { MonitoringService } from "src/app/services/monitoring/monitoring.service";
import { StorageService } from "src/app/services/storage/storage.service";

@Component({
  selector: "app-list-monitoring",
  templateUrl: "./list-monitoring.component.html",
  styleUrls: ["./list-monitoring.component.scss"]
})
export class ListMonitoringComponent implements OnInit {
  constructor(
    private storage: StorageService,
    private monitoringService: MonitoringService,
    private configMS: ConfigMonitoringChannelService,
    private bedsService: BedsService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.editOrder = !(window.innerWidth < 500);
  }

  monitorings: IMonitoring[][] = [];
  index = 0;
  isSetting: any;

  monitor_exibition = 0;

  // Pagination
  total_page = 1;
  current_page = 1;
  count_page = 1;
  prev = false;
  next = false;

  editOrder = true;
  triggerAlarmObj: ITriggerAlarm = {} as ITriggerAlarm;

  ngOnInit(): void {
    // this.backOrNextPage(this.current_page);
    this.isSetting = this.storage.mysetting;

    this.setMonitoring();
    this.monitoringService.watchMonitoring().subscribe({
      next: () => {
        this.setMonitoring();
      }
    });
  }

  b = 1;
  alaming: IMonitoring[] = [];

  triggerAlarm(event: ITriggerAlarm, index: number) {
    // this.b++;
    this.triggerAlarmObj = event;

    setTimeout(() => {
      if (event?.active) {
        this.monitorings[this.index][index].equipment[0].status = "ALARMANDO";


        for (const item of this.monitorings[this.index]) {
          if (item.equipment && item.equipment.length > 0) {
            const alarmandoEquipment = item.equipment.find(
              (e) => e.status === "ALARMANDO"
            );
            if (alarmandoEquipment) {
              const highPriorityAlarm = item.params?.find(
                (param) => param.alarm?.priority === "HIGH"
              );
              const mediumPriorityAlarm = item.params?.find(
                (param) => param.alarm?.priority === "MEDIUM"
              );
              const lowPriorityAlarm = item.params?.find(
                (param) => param.alarm?.priority === "LOW"
              );


              if (highPriorityAlarm) {
                this.playSound("high");
                return;
              } else if (mediumPriorityAlarm) {
                this.playSound("medium");
                return;
              } else if (lowPriorityAlarm) {
                this.playSound("low");
                return;
              }
            }
          }
        }
      }
    }, 0);

    // console.log(this.b);
  }

  audioPlaying = false;

  playSound(mon: string) {
    if (mon.length === 0) return;
    // Verifica se já há uma instância de áudio em execução
    if (this.audioPlaying) {
      return;
    }

    // instância de áudio está em execução
    this.audioPlaying = true;

    setTimeout(() => {
      const playAudio = (rep: any) => {
        if (rep > 0) {
          setTimeout(() => {
            const audioBip = new Audio();

            audioBip.volume = this.storage.mySettings.volume / 100;
            if (mon === "high") {
              audioBip.src = "../assets/sounds/generalHigh.wav";
            }
            if (mon === "medium") {
              // audioBip.src = "../assets/sounds/generalMedium.wav";
            }
            if (mon === "low") {
              // audioBip.src = "../assets/sounds/lowPriority.wav";
            }

            // ouvinte para lidar com a conclusão da reprodução
            audioBip.addEventListener("ended", () => {
              // reprodução de áudio foi concluída
              this.audioPlaying = false;
              setTimeout(() => {}, 12000);
              //  próxima iteração se houver
              playAudio(rep - 1);
            });

            audioBip.load();
            audioBip.play();
          }, 3000);
        }
      };
      playAudio(3);
    }, 10);
  }

  setMonitoring() {
    const _monitoringsBackup = this.configMS.orderMonitorOnline(
      this.monitoringService.getMonitorings()
    );

    console.log(_monitoringsBackup);

    this.monitorings = [];

    const count =  _monitoringsBackup.length;
    const _exibition =  this.isSetting.monitor_exibition;
    
    console.log(count);
    console.log(_exibition);
    
    this.total_page = Math.ceil(count / _exibition);
    console.log(this.total_page);

    // Preenche o novo array com arrays de 10 itens
    for (let i = 0; i < this.total_page; i++) {
      const startIndex = i * _exibition;
      const endIndex = startIndex + _exibition;
      const subArray =  _monitoringsBackup.slice(startIndex, endIndex);
      console.log(subArray);
      
      this.monitorings.push(subArray);
    }

    this.backOrNextPage(this.current_page);
  }

  // Pagination
  backOrNextPage(event: any) {
    this.current_page = event;
    this.index = event-1;
    
    this.next = this.current_page < this.total_page;
    this.prev = this.current_page > 1;

    this.monitor_exibition =
      this.isSetting.monitor_exibition - (this.monitorings.length > 0 ?  this.monitorings[this.index].length : 0) || 0;

    this.cdr.detectChanges();
  }

  drop(event: CdkDragDrop<any>) {
    this.monitorings[this.index][event.previousContainer.data.index] =
      event.container.data.item;

    this.monitorings[this.index][event.container.data.index] =
      event.previousContainer.data.item;

    let array: any = [];

    this.monitorings.forEach(element => {
      array = array.concat(element)
    });

    const arrayId = array.map((el: any) => {return el.id})
    console.log(arrayId);

    this.saveOrder({ beds: arrayId });
  }

  encontrarItensDiferentes(arrayA: any[], arrayB: any[]): any[] {
    const diferentesArrayA = arrayA.filter(
      (itemA) => !arrayB.some((itemB) => itemB.id === itemA.id)
    );
    const diferentesArrayB = arrayB.filter(
      (itemB) => !arrayA.some((itemA) => itemA.id === itemB.id)
    );

    return [...diferentesArrayA, ...diferentesArrayB];
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

  eventComponent(event: any) {}
}
