import { getTestBed } from '@angular/core/testing';
import { webSocket } from 'rxjs/webSocket';
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

@Component({
  selector: 'app-sensor-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sensor-stats.component.html',
  styleUrls: ['./sensor-stats.component.scss'],
})
export class SensorStatsComponent implements OnInit, OnChanges {
  @Input()
  timeSeries: TimeSeries | undefined | null;

  chartOption: EChartsOption | undefined;

  constructor(private webSocket: WebSocketService) {}

  ngOnInit(): void {
    this.webSocket.getWebsocket().subscribe((msg) => {
      console.log(msg);
    });
    console.log(this.timeSeries);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['timeSeries']) {
      this.chartOption = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.timeSeries?.times,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.timeSeries?.values,
            type: 'line',
            areaStyle: {},
          },
        ],
      };
    }
  }
}
