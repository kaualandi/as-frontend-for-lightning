import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { IMonitoring, ITriggerAlarm } from "src/app/models/monitoring";
import { StorageService } from "src/app/services/storage/storage.service";

@Component({
  selector: "app-card-monitor",
  templateUrl: "./card-monitor.component.html",
  styleUrls: ["./card-monitor.component.scss"],
})
export class CardMonitorComponent implements OnInit {
  constructor(
    private router: Router,
    private storage: StorageService,
  ) {}

  @Input() bed: IMonitoring = {} as IMonitoring;
  @Output() eventAlarm = new EventEmitter<ITriggerAlarm>();

  typeView = false;
  info = "";
  monitor = "";
  timer = "";
  status = "Online";

  size: any = {
    width: 0,
  };

  index_bp = 0;
  breakpoints = [
    {
      hertz: 250, // ECG1, SpO2, RESP
      secs: 5,
    },
    {
      hertz: 1000, // ECG1, ECG2, ECG3
      secs: 3,
    },
    {
      hertz: 150, // SpO2
      secs: 5,
    },
  ];

  viewInfoCard = true;
  alarm: any;
  isSetting: any;
  numChannel = 0;

  ngOnInit() {
    this.isSetting = this.storage.mysetting;
    this.info = `${this.bed.patient?.name} - ${this.bed.patient?.doctor_name}`;
    this.monitor = `${this.bed.equipment[0]?.brand} - ${this.bed.equipment[0]?.model}`;

    this.numChannel =
      this.isSetting.monitor_exibition === 32
        ? 2
        : this.bed.equipment[0].model === "MP40"
        ? 0
        : 4;

    this.viewInfoCard = ["ONLINE", "ALARMANDO"].includes(
      this.bed.equipment[0].status?.toUpperCase()
    );

    const ONLINE = this.bed.equipment.filter(
      (el) => (el.status || "").toUpperCase() === "ONLINE"
    );
    if (ONLINE.length > 0) {
      this.status = "ONLINE";
    }

    const OFFLINE = this.bed.equipment.filter(
      (el) => (el.status || "").toUpperCase() === "OFFLINE"
    );
    if (OFFLINE.length > 0) {
      this.status = "OFFLINE";
    }    
  }

  triggerAlarm(event: ITriggerAlarm) {
    this.eventAlarm.emit(event);

    this.alarm = event;

    if (event.active) {
      this.playSound();
    }
  }

  playSound() {
    // setTimeout(() => {
    //   const audioElement = document.querySelector("audio") as HTMLAudioElement;
    //   // Função para tocar o áudio com repetições
    //   const playAudio = (repeticoes: any) => {
    //     if (repeticoes > 0) {
    //       audioElement.play();
    //       setTimeout(() => {
    //         audioElement.pause();
    //         audioElement.currentTime = 0;
    //         playAudio(repeticoes - 1); // Chama recursivamente para as repetições restantes
    //       }, 1000); // 1 segundo de reprodução
    //     }
    //   };
    //   // Inicia a reprodução com 3 repetições
    //   playAudio(3);
    // }, 10);
  }

  openMonitoring() {
    if (
      ["ONLINE", "ALARMANDO"].includes(
        this.bed.equipment[0].status?.toUpperCase()
      )
    ) {
      this.router.navigate([`/monitoring/detail/${this.bed.id}`]);
    }
  }

  changeView(event: Event) {
    event.stopPropagation();
    this.bed.typeView = !this.bed.typeView;
  }

  openPatient(event: Event) {
    event.stopPropagation();
    this.router.navigate(["/patient-display/", this.bed.patient.id]);
  }

  openEquipment(event: Event) {
    // event.stopPropagation();
    // this.router.navigate(["/patient-display/", this.bed.patient.id]);
  }

  orderList(list: any[]) {
    return list.sort((a, b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });
  }

  stopProp(e: Event) {
    e.stopPropagation();
  }
}
