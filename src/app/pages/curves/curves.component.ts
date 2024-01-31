import { Component } from "@angular/core";
import { SciChartSurface } from "scichart";
import { SciService } from "./../../services/sciService/sci-service.service";
@Component({
  selector: "app-curves",
  templateUrl: "./curves.component.html",
  styleUrls: ["./curves.component.scss"],
})
export class CurvesComponent {
  constructor(private sciService: SciService) {}

  title = "angular-scichart-demo";
  chartInitializationPromise: Promise<SciChartSurface> | undefined;

  ngOnInit(): void {
    this.cleanupSciChart();
    this.chartInitializationPromise = this.sciService.init(); // defined above
  }

  ngOnDestroy() {
    this.cleanupSciChart();
  }

  cleanupSciChart() {
    if (this.chartInitializationPromise) {
      // Delete the chart from the DOM, and dispose of SciChart
      this.chartInitializationPromise.then((sciChartSurface) => {
        sciChartSurface.delete();
      });
      this.chartInitializationPromise = undefined;
    }
  }
}
