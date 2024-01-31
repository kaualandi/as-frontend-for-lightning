import { Injectable } from "@angular/core";
import {
  SciChartSurface,
  NumericAxis,
  FastLineRenderableSeries,
  XyDataSeries,
  EllipsePointMarker,
  SweepAnimation,
  SciChartJsNavyTheme,
  NumberRange
} from "scichart";
import { vitalSignsEcgData } from "./data";

const appTheme = new SciChartJsNavyTheme();
const STEP = 10;
const TIMER_TIMEOUT_MS = 20;
const STROKE_THICKNESS = 4;
const POINTS_LOOP = 5200;
const GAP_POINTS = 50;
const DATA_LENGTH = vitalSignsEcgData.xValues.length;

@Injectable({
  providedIn: "root"
})
export class SciService {
  async init() {
    // LICENSING
    // Commercial licenses set your license code here
    // Purchased license keys can be viewed at https://www.scichart.com/profile
    // How-to steps at https://www.scichart.com/licensing-scichart-js/
    // SciChartSurface.setRuntimeLicenseKey("YOUR_RUNTIME_KEY");

    // Initialize SciChartSurface. Don't forget to await!
    const { sciChartSurface, wasmContext } = await SciChartSurface.create(
      "scichart-root",
      {
        theme: new SciChartJsNavyTheme(),
        title: "SciChart.js First Chart",
        titleStyle: { fontSize: 22 }
      }
    );

    // Create an XAxis and YAxis with growBy padding
    const growBy = new NumberRange(0.1, 0.1);
    sciChartSurface.xAxes.add(
      new NumericAxis(wasmContext, { axisTitle: "X Axis", growBy })
    );

    const yAxisHeartRate = new NumericAxis(wasmContext, {
      id: "yHeartRate",
      visibleRange: new NumberRange(0.7, 1.0),
      isVisible: false
    });
    sciChartSurface.yAxes.add(yAxisHeartRate);

    const pointMarkerOptions = {
      width: 7,
      height: 7,
      strokeThickness: 2,
      fill: "#ff0",
      lastPointOnly: true
    };

    const fifoSweepingGap = GAP_POINTS;
    const dataSeries1 = new XyDataSeries(wasmContext, {
      fifoCapacity: POINTS_LOOP,
      fifoSweeping: true,
      fifoSweepingGap
    });

    // Create a line series with some initial data
    sciChartSurface.renderableSeries.add(
      new FastLineRenderableSeries(wasmContext, {
        yAxisId: yAxisHeartRate.id,
        strokeThickness: STROKE_THICKNESS,
        stroke: "#f00",
        dataSeries: dataSeries1,
        pointMarker: new EllipsePointMarker(wasmContext, {
          ...pointMarkerOptions,
          stroke: "#f00"
        })
      })
    );

    // Add some interaction modifiers to show zooming and panning
    sciChartSurface.chartModifiers.add();

    let timerId: NodeJS.Timeout;

    return sciChartSurface;
  }
}
