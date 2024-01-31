import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({
  name: "typeAlarms",
})
export class TypeAlarmsPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  transform(value: string): string {
    switch (value) {
      case "PARAMETER":
        return this.translate.instant("pipes.typeAlarms.PARAMETER");
      default:
        return "";
    }
  }
}
