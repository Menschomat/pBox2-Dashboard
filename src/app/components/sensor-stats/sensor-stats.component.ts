import { TimeSeries } from './../../model/enclosure';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';

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

  constructor() {}

  ngOnInit(): void {
    console.log(this.timeSeries);
    
    
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes["timeSeries"]){
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
