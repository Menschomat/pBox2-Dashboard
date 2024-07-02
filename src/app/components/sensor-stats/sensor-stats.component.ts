import { SensorService } from 'src/app/services/sensor.service';
import { TimeSeries } from './../../model/enclosure';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import * as echarts from 'echarts';

@Component({
  selector: 'app-sensor-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sensor-stats.component.html',
  styleUrls: ['./sensor-stats.component.scss'],
})
export class SensorStatsComponent implements OnInit, OnDestroy {
  @Input()
  sensorId!: string;
  @Input()
  boxId!: string;
  @Input()
  encId!: string;
  echartsInstance: any;
  chartOption: EChartsOption = {
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
      // boundaryGap: 0,
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  };
  private tsSubscription: Subscription | undefined;

  constructor(private sensorService: SensorService) {}

  ngOnInit(): void {
    this.tsSubscription = this.sensorService
      .getSensorData(this.boxId, this.sensorId, this.encId)
      .subscribe((ts) => {
        this.updateChart(ts);
      });
  }
  ngOnDestroy(): void {
    if (!this.tsSubscription || this.tsSubscription.closed) return;
    this.tsSubscription?.unsubscribe();
  }

  onChartInit(ec: any) {
    this.echartsInstance = ec;
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe((event) => {
        this.echartsInstance?.resize();
      });
  }
  updateChart(timeSeries: TimeSeries) {
    if (!(timeSeries && timeSeries.values)) return;
    const min = timeSeries ? Math.min(...timeSeries.values) : 0;
    const max = timeSeries ? Math.max(...timeSeries.values) : 0;
    const offset = 0.5;
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
        // boundaryGap: 0,
      },
      yAxis: {
        type: 'value',
        min: Math.floor(min - offset),
        max: Math.ceil(max + offset),
      },
      series: [
        {
          data: timeSeries
            ? timeSeries.values.map((e, i) => [
                timeSeries ? timeSeries.times[i] : 0,
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
