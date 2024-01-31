import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "firstCapital",
})
export class FirstCapitalPipe implements PipeTransform {
  transform(value: string): string {
    const lower = value.toLowerCase();
    const first = lower[0].toUpperCase();
    return first + lower.substring(1);
  }
}
