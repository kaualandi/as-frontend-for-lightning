import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import { StorageService } from "../services/storage/storage.service";

type FormattedDateArgs = ["datetime" | "date" | "time", string?];

@Pipe({
  name: "fDate",
})
export class FormattedDatePipe implements PipeTransform {
  constructor(private storage: StorageService, private datePipe: DatePipe) {}

  transform(
    value: string | Date | null | undefined,
    ...args: FormattedDateArgs
  ) {
    if (!value) return "";
    const [type] = args;

    const dateFormart = this.storage.mysetting?.data_format || "dd/MM/yyyy";
    const timeFormart =
      this.storage.mysetting?.hour_format === "24h" ? "HH:mm:ss" : "hh:mm:ss a";

    switch (type) {
      case "datetime":
        return this.datePipe.transform(value, `${dateFormart} ${timeFormart}`);
      case "date":
        return this.datePipe.transform(value, dateFormart);
      case "time":
        return this.datePipe.transform(value, timeFormart);
      default:
        return "";
    }
  }
}
