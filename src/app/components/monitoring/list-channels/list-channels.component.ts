import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
import { Router } from "@angular/router";
import { IChannel } from "src/app/models/equipment";
import { ITriggerAlarm } from "src/app/models/monitoring";
import { ConfigMonitoringChannelService } from "src/app/services/monitoring/config-monitoring-channel.service";
import { StorageService } from "src/app/services/storage/storage.service";

@Component({
  selector: "app-list-channels",
  templateUrl: "./list-channels.component.html",
  styleUrls: ["./list-channels.component.scss"]
})
export class ListChannelsComponent implements OnInit, OnChanges, AfterViewInit {
  constructor(
    private configMS: ConfigMonitoringChannelService,
    private storage: StorageService,
    private router: Router
  ) {}

  @Input() channels!: IChannel[];
  @Input() status = "Online";
  @Input() limit = 0;
  @Input() isAll = false;
  @Output() eventAlarm = new EventEmitter<ITriggerAlarm>();

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.setHeightCards();
  }

  @ViewChild('heightCard', { static: true }) heightCard!: ElementRef;

  listFont = [
    { label: "0.4rem", measure: "1.4rem" },
    { label: "0.4rem", measure: "1.2rem" },
    { label: "0.4rem", measure: "2rem" }
  ];

  newChannels: any = [];
  isSetting: any;
  alarm: any;
  isPNIorPI = false;
  screen: "MONITORING" | "DETAIL" = "MONITORING";

  heightCards = 0;

  ngOnChanges() {
    this.newChannels = this.configMS.setArrayParams(
      Object.assign([], [...this.channels]),
      this.limit
    );
    
    this.isPNIorPI =
      this.newChannels.filter((el: any) => ["PNI", "PI"].includes(el.label))
        .length > 0;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setHeightCards();
    }, 100);
  }

  ngOnInit(): void {
    this.isSetting = this.storage.mysetting;

    this.newChannels = this.configMS.setArrayParams(
      Object.assign([], [...this.channels]),
      this.limit
    );

    this.screen = this.router.url.includes("detail") ? "DETAIL" : "MONITORING";
  }

  setHeightCards() {
    let HEIGHT = 0;
    const heightCardElement: HTMLDivElement = this.heightCard.nativeElement;
    const cards: NodeListOf<HTMLDivElement> = heightCardElement.querySelectorAll('.heightCard');

    cards.forEach((el: any) => {
      const W30 = el.classList.value.includes("w-30");
      const W50 = el.classList.value.includes("w-50");

      if ((W30 || W50) && el.clientHeight > HEIGHT) {
        HEIGHT = el.clientHeight;
      }
    });

    this.heightCards = HEIGHT;
  }

  triggerAlarm(event: ITriggerAlarm) {
    this.alarm = event;
    this.eventAlarm.emit(event);
  }

  checkQtd(param: any, qtd: number, idx: number) {
    const classe = "";

    let auxClass = "w-100";

    if (qtd === 1) auxClass = "w-100" + classe;
    else if (qtd === 2 || qtd === 4) auxClass = "w-50" + classe;
    else if (qtd > 3) auxClass = "w-30" + classe;
    else auxClass = "w-50" + classe;

    if (param.channel !== "PNI" && param.channel !== "PI" && this.isPNIorPI) {
      auxClass = "w-30" + classe;
    }
    if (
      (param.channel === "PNI" || param.channel === "PI") &&
      qtd >= 4 &&
      idx <= 2
    ) {
      if (this.screen === "MONITORING") {
        auxClass = "w-100" + classe;
      } else {
        auxClass = "w-50" + classe;
      }
    }

    return auxClass;
  }
}
