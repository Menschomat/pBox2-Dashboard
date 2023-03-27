import { SensorEventBody } from './../../model/events/sensor-event';
import { TimeSeries } from './../../model/enclosure';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { filter, map } from 'rxjs';
import { SocketEventType } from 'src/app/model/events/socket-event';
import * as echarts from 'echarts';

@Component({
  selector: 'app-sensor-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sensor-stats.component.html',
  styleUrls: ['./sensor-stats.component.scss'],
})
export class SensorStatsComponent implements OnInit, OnChanges {
  @Input()
  timeSeries: TimeSeries | undefined | null;
  @Input()
  sensorId?: string | null;
  @Input()
  boxId?: string | null;
  @Input()
  encId?: string | null;
  echartsInstance: any;
  chartOption: EChartsOption | undefined;

  constructor(private webSocket: WebSocketService) {}

  ngOnInit(): void {
    this.webSocket
      .getWebsocket()
      .pipe(
        filter((event) => event.type == SocketEventType.SENSOR),
        filter((event) => event.topic == `${this.encId}/${this.boxId}`),
        map((event) => event.body as SensorEventBody),
        filter((body) => body.id == this.sensorId)
      )
      .subscribe((msg) => {
        this.timeSeries?.times.push(msg.time);
        this.timeSeries?.values.push(msg.value);
        if (this.timeSeries && this.timeSeries.times.length > 500) {
          this.timeSeries.times.shift();
          this.timeSeries.values.shift();
        }
        this.updateChart();
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['timeSeries']) {
      this.updateChart();
    }
  }
  onChartInit(ec: any) {
    this.echartsInstance = ec;
  }
  updateChart() {
    const min = this.timeSeries ? Math.min(...this.timeSeries.values) : 0;
    const max = this.timeSeries ? Math.max(...this.timeSeries.values) : 0;
    const offset = ((max - min) / 100) * 10;
    this.chartOption = {
      color: ['#FFBF00', '#80FFA5', '#00DDFF', '#37A2FF', '#FF0087'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      xAxis: {
        type: 'time',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        min: Math.floor(min - offset),
        max: Math.ceil(max + offset),
      },
      series: [
        {
          data: this.timeSeries
            ? this.timeSeries.values.map((e, i) => [
                this.timeSeries ? this.timeSeries.times[i] : 0,
                e,
              ])
            : [],
          type: 'line',
          smooth: true,
          showSymbol: false,
          label: {
            show: true,
            position: 'top',
          },
          lineStyle: {
            color: '#5470C6',
            width: 3,
          },
        },
      ],
    };
    this.echartsInstance?.setOption(this.chartOption, true);
  }
}
