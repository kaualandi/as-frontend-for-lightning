import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ConfigMonitoringChannelService } from "src/app/services/monitoring/config-monitoring-channel.service";
import { MonitoringService } from "src/app/services/monitoring/monitoring.service";
import {
  AutoCursorModes,
  AxisTickStrategies,
  ColorHEX,
  Dashboard,
  PointShape,
  SolidFill,
  emptyLine,
  lightningChart,
  Color,
  SolidLine,
} from "src/app/vendor/lcjs";

interface Channel {
  name: string;
  yMin: number;
  yMax: number;
  color: Color;
  colorLine: Color;
  data: number[];
}

@Component({
  selector: "curves-card",
  templateUrl: "./curves-card.component.html",
  styleUrls: ["./curves-card.component.scss"],
})
export class CurvesCardComponent implements AfterViewInit, OnDestroy {
  constructor(private configMS: ConfigMonitoringChannelService) {}

  @ViewChild("chart") chart!: ElementRef<HTMLDivElement>;
  @Input() data: number[] = [];
  @Input() name = "";
  @Input() colorDot = "";
  @Input() colorLine = "";
  @Input() hertz = 250;
  @Input() secs = 5;
  @Input() min = 0;
  @Input() max = 0;
  @Input() ceiling: number | null = null;
  @Input() floor: number | null = null;
  dashboard!: Dashboard;

  yPoints: number[] = [];

  intervalID = "";
  clearShart = false;
  previewJson = null;
  limitTime = 20 * 1000; // segundos
  timer = null;

  channel = {} as Channel;

  ngAfterViewInit() {
    // console.clear();
    this.getCurves();
  }

  ngOnDestroy(): void {
    this.dashboard.dispose();
  }

  getCurves() {
    // const maxValue = Math.max(...this.data.map((curve) => Number(curve.x)));
    const maxValue =
      this.max !== 0
        ? this.max
        : this.ceiling === null
        ? Math.max(...this.data)
        : this.ceiling;

    // const minValue = Math.min(...this.data.map((curve) => Number(curve.x)));
    const minValue =
      this.min !== 0
        ? this.min
        : this.floor === null
        ? Math.min(...this.data)
        : this.floor;

    this.channel = {
      name: this.name,
      yMin: minValue - 5,
      yMax: maxValue + 5,
      color: ColorHEX(this.colorDot),
      colorLine: ColorHEX(this.colorLine),
      // data: this.data.map((curve) => curve.x),
      data: this.data,
    };

    if (!this.dashboard) this.renderMonitor([this.channel]);
    // console.log("Dashboard ==> ",this.dashboard)
  }

  renderMonitor(CHANNELS: Channel[]) {
    console.log("CHANNELS ==>", CHANNELS)
    const X_VIEW_MS = this.secs * 1000;

    // setInterval(() => {
    // this.yPoints = [];
    // this.yPoints.push(...this.channel.data);
    // }, 1000);

    const solidLine = new SolidLine({
      thickness: 2,
      fillStyle: new SolidFill({ color: CHANNELS[0].colorLine }),
    });

    this.dashboard = lightningChart()
      .Dashboard({
        numberOfColumns: 1,
        numberOfRows: CHANNELS.length,
        container: this.chart.nativeElement,
      })
      .setSplitterStyle(emptyLine)
      .setBackgroundFillStyle(
        new SolidFill({
          color: ColorHEX("#181818"),
        })
      );
    const theme = this.dashboard.getTheme();
    const ecgBackgroundFill = new SolidFill({
      color: theme.isDark ? ColorHEX("#181818") : ColorHEX("#ffffff"),
    });

    const channels = CHANNELS.map((info, iCh) => {
      const chart = this.dashboard
        .createChartXY({
          columnIndex: 0,
          rowIndex: iCh,
        })
        // .setTitle(info.name + "  -  " + (iCh + idxColorSom))
        // .setTitle(info.name + "  -  " + info.colorIdx)
        .setTitle(info.name)
        .setPadding(0)
        .setTitlePosition("series-left-top")
        .setAutoCursorMode(AutoCursorModes.disabled)
        .setSeriesBackgroundFillStyle(ecgBackgroundFill)
        .setMouseInteractions(false)
        .setSeriesBackgroundStrokeStyle(emptyLine);

      const axisX = chart
        .getDefaultAxisX()
        .setTickStrategy(AxisTickStrategies.Empty)
        .setStrokeStyle(emptyLine)
        .setScrollStrategy(undefined)
        .setInterval({ start: 0, end: X_VIEW_MS, stopAxisAfter: false });

      const axisY = chart
        .getDefaultAxisY()
        .setStrokeStyle(emptyLine)
        .setInterval({ start: info.yMin, end: info.yMax })
        .setTickStrategy(AxisTickStrategies.Empty);

      // Series for displaying "old" data.
      const seriesRight = chart
        .addLineSeries({
          dataPattern: { pattern: "ProgressiveX" },
        })
        .setName(info.name)
        .setStrokeStyle(solidLine)
        .setEffect(false);

      // Rectangle for hiding "old" data under incoming "new" data.
      const seriesOverlayRight = chart
        .addRectangleSeries()
        .setEffect(false)
        .add({ x1: 0, y1: 0, x2: 0, y2: 0 })
        .setFillStyle(ecgBackgroundFill)
        .setStrokeStyle(emptyLine)
        .setMouseInteractions(false);

      // Series for displaying new data.
      const seriesLeft = chart
        .addLineSeries({
          dataPattern: { pattern: "ProgressiveX" },
        })
        .setName(info.name)
        .setStrokeStyle(solidLine)
        .setEffect(false);

      const seriesHighlightLastPoints = chart
        .addPointSeries({ pointShape: PointShape.Circle })
        .setPointFillStyle(new SolidFill({ color: info.color }))
        .setPointSize(5)
        .setEffect(false);

      // Synchronize highlighting of "left" and "right" series.
      let isHighlightChanging = false;
      [seriesLeft, seriesRight].forEach((series) => {
        series.onHighlight((value) => {
          if (isHighlightChanging) {
            return;
          }
          isHighlightChanging = true;
          seriesLeft.setHighlight(value);
          seriesRight.setHighlight(value);
          isHighlightChanging = false;
        });
      });

      return {
        chart,
        seriesLeft,
        seriesRight,
        seriesOverlayRight,
        seriesHighlightLastPoints,
        axisX,
        axisY,
      };
    });

    // Setup logic for pushing new data points into a "custom sweeping line chart".
    // LightningChart JS does not provide built-in functionalities for sweeping line charts.
    // This example shows how it is possible to implement a performant sweeping line chart, with a little bit of extra application complexity.
    let prevPosX = 0;
    // Keep track of data pushed to each channel.
    const channelsNewDataCache = new Array(CHANNELS.length)
      .fill(0)
      .map((_) => []);

    const appendDataPoints = (dataPointsAllChannels: any) => {
      // Keep track of the latest X (time position), clamped to the sweeping axis range.
      let posX = 0;

      let channel: any; // mudando a inicialização da variável e trocando de constante para variável

      for (let iCh = 0; iCh < CHANNELS.length; iCh += 1) {
        const newDataPointsTimestamped = dataPointsAllChannels[iCh];
        const newDataCache: any[] = channelsNewDataCache[iCh];

        channel = channels[iCh];

        // NOTE: Incoming data points are timestamped, meaning their X coordinates can go outside sweeping axis interval.
        // Clamp timestamps onto the sweeping axis range.
        const newDataPointsSweeping = newDataPointsTimestamped.map(
          (dp: any) => ({
            x: dp.x % X_VIEW_MS,
            y: dp.y,
          })
        );

        posX = Math.max(
          posX,
          newDataPointsSweeping[newDataPointsSweeping.length - 1].x
        );

        // Check if the channel completes a full sweep (or even more than 1 sweep even though it can't be displayed).
        let fullSweepsCount = 0;
        let signPrev = false;
        for (const dp of newDataPointsSweeping) {
          const sign = dp.x < prevPosX;
          if (sign === true && sign !== signPrev) {
            fullSweepsCount += 1;
          }
          signPrev = sign;
        }

        if (fullSweepsCount > 1) {
          // The below algorithm is incapable of handling data input that spans over several full sweeps worth of data.
          // To prevent visual errors, reset sweeping graph and do not process the data.
          // This scenario is triggered when switching tabs or minimizing the example for extended periods of time.
          channel.seriesRight.clear();
          channel.seriesLeft.clear();
          newDataCache.length = 0;
        } else if (fullSweepsCount === 1) {
          // Sweeping cycle is completed.
          // Copy data of "left" series into the "right" series, clear "left" series.

          // Categorize new data points into "right" and "left" sides.
          const newDataPointsLeft = [];
          for (const dp of newDataPointsSweeping) {
            if (dp.x > prevPosX) {
              newDataCache.push(dp);
            } else {
              newDataPointsLeft.push(dp);
            }
          }
          channel.seriesRight.clear().add(newDataCache);
          channel.seriesLeft.clear().add(newDataPointsLeft);
          newDataCache.length = 0;
          newDataCache.push(...newDataPointsLeft);
        } else {
          // Append data to left.
          channel.seriesLeft.add(newDataPointsSweeping);
          // NOTE: While extremely performant, this syntax can crash if called with extremely large arrays (at least 100 000 items).
          newDataCache.push(...newDataPointsSweeping);
        }

        // Highlight last data point.
        const highlightPoints = [
          newDataCache.length > 0
            ? newDataCache[newDataCache.length - 1]
            : newDataPointsSweeping[newDataPointsSweeping.length - 1],
        ];
        channel.seriesHighlightLastPoints.clear().add(highlightPoints);
      }

      // Move overlays of old data to right locations.
      const overlayXStart = 0;
      const overlayXEnd = posX + X_VIEW_MS * 0.03;
      channels.forEach((channel) => {
        channel.seriesOverlayRight.setDimensions({
          x1: overlayXStart,
          x2: overlayXEnd,
          y1: channel.axisY.getInterval().start,
          y2: channel.axisY.getInterval().end,
        });
      });

      prevPosX = posX;

      channel = {};
      // reseta o carnal no final do evento para sair do loop
    };

    // Setup example data streaming
    const tStart = window.performance.now();
    let pushedDataCount = 0;
    const dataPointsPerSecond = this.hertz; // 1000 Hz
    const xStep = 1000 / dataPointsPerSecond;

    const streamData = () => {
      const tNow = window.performance.now();
      // NOTE: This code is for example purposes only (streaming stable data rate)
      // In real use cases, data should be pushed in when it comes.
      const shouldBeDataPointsCount = Math.floor(
        (dataPointsPerSecond * (tNow - tStart)) / 1000
      );
      const newDataPointsCount = shouldBeDataPointsCount - pushedDataCount;
      if (newDataPointsCount > 0) {
        const newDataPoints: any[] = [];
        for (let iDp = 0; iDp < newDataPointsCount; iDp++) {
          const x = (pushedDataCount + iDp) * xStep;
          const iData = (pushedDataCount + iDp) % CHANNELS[0].data.length;

          this.configMS.contentRest = iData;

          // console.log(this.configMS.contentRest);

          let y = CHANNELS[0].data[iData];

          if (this.configMS.clearShart) {
            console.log("ZERANDO Y");
            // Verifica é permitido zerar o y, ocorre quando não há mensagem do servidor de curvas
            // console.log(this.clearShart, "vou zerar o y");
            y = 0;
          }

          const point = { x, y };
          newDataPoints.push(point);
        }

        // For this examples purposes, stream same data into all channels.
        appendDataPoints(
          new Array(CHANNELS.length).fill(0).map((_) => newDataPoints)
        );
        pushedDataCount += newDataPointsCount;
      }

      requestAnimationFrame(streamData);
    };
    streamData();
  }
}
