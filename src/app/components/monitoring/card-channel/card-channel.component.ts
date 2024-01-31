import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ITriggerAlarm } from "src/app/models/monitoring";

@Component({
  selector: "app-card-channel",
  templateUrl: "./card-channel.component.html",
  styleUrls: ["./card-channel.component.scss"],
})
export class CardChannelComponent implements OnInit, DoCheck {
  // constructor() {}

  @Input() param!: {
    channel: string;
    color: string;
    label: string;
    name: string;
    is_active: boolean;
    order: number;
    value: number;
    valueNew: any;
    equipment: number;
    alarm: {
      id: number;
      priority: string;
      source: string;
      name: string;
      max: number;
      min: number;
    };
  };

  @Input() arrayST!: any[];

  widthScss = 0;
  isAlarm = false;
  rule = "";

  @Output() eventAlarm = new EventEmitter<ITriggerAlarm>();

  @ViewChild("sizeChannel") sizeChannel!: ElementRef;

  @HostListener("window:resize", ["$event"])
  onResize() {
    const width = this.sizeChannel?.nativeElement.offsetWidth;
    this.widthScss = width;
  }

  newChannels: any = [];

  ngDoCheck() {
    const width = this.sizeChannel?.nativeElement.offsetWidth;
    this.widthScss = width;
  }

  ngOnInit(): void {
    if (this.param.alarm?.max && this.param.value > this.param.alarm.max) {
      this.rule = "max";
      this.isAlarm = true;
      this.eventAlarm.emit({
        color: this.param.color,
        rule: "max",
        active: true,
        param: this.param,
      });
    }
    if (this.param.alarm?.min && this.param.value < this.param.alarm.min) {
      this.rule = "min";

      this.isAlarm = true;
      this.eventAlarm.emit({
        color: this.param.color,
        rule: "min",
        active: true,
        param: this.param,
      });
    }
  }

  setClass(param: any) {
    let auxClass = '';
    
    // Check if the alarm and its label match the parameter
    if (this.isAlarm) {
      auxClass += 'alarm ';
    }
  
    // Check the priority and add corresponding class
    const priority = param?.alarm?.priority;
    if (priority) {
      auxClass += priority + ' ';
    }
  
    return auxClass.trim(); // Trim to remove extra spaces
  }
  
}
