import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "priorityAlarms"
})
export class PriorityAlarmsPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  transform(value: string): string {
    switch (value) {
      case "LOW":
        return this.translate.instant("pipes.priorityAlarms.LOW");
      case "MEDIUM":
        return this.translate.instant("pipes.priorityAlarms.MEDIUM");
      case "HIGH":
        return this.translate.instant("pipes.priorityAlarms.HIGHT");
      default:
        return "";
    }
  }
}
