import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.scss"]
})
export class ChannelComponent implements OnInit {
  @Input() channel!: {
    title: string;
    value: string;
    color: string;
    status: string;
    channel: any;
  };

  @ViewChild("sizeChannel") sizeChannel!: ElementRef;
  // constructor() {}

  listFont = [
    { label: "0.4rem", measure: "1.2rem" },
    { label: "0.4rem", measure: "1.2rem" },
    { label: "0.4rem", measure: "2rem" }
  ];

  objChannel = { width: 0, height: 0 };

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.setFontSize();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.setFontSize();
    }, 10);
  }

  setSizeCard() {
    const width = this.sizeChannel?.nativeElement.offsetWidth;
    const height = this.sizeChannel?.nativeElement.offsetHeight;
    return { width, height };
  }

  getElements() {
    const nameElement = this.sizeChannel.nativeElement.querySelector(".name");
    const measureElement =
      this.sizeChannel.nativeElement.querySelector(".measure");
    nameElement.style = ``;
    measureElement.style = ``;
    return { nameElement, measureElement };
  }

  setFontSize() {
    const { nameElement, measureElement } = this.getElements();
    const { width, height } = this.setSizeCard();

    if (width > 150 && height > 75) {
      nameElement.style = `font-size: ${this.listFont[2].label} !important; color: ${this.channel.color}`;
      measureElement.style = `font-size: ${this.listFont[2].measure} !important; color: ${this.channel.color}`;
    } else {
      nameElement.style = `font-size: ${this.listFont[0].label} !important; color: ${this.channel.color}`;
      measureElement.style = `font-size: ${this.listFont[0].measure} !important; color: ${this.channel.color}`;
    }
  }
}
