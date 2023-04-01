import { BoxService } from 'src/app/services/box.service';
import { Enclosure, Box, TimeSeries } from './../../model/enclosure';
import { EnclosureService } from './../../services/enclosure.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SensorService } from 'src/app/services/sensor.service';

@Component({
  selector: 'app-enclosure',
  templateUrl: './enclosure.component.html',
  styleUrls: ['./enclosure.component.scss'],
})
export class EnclosureComponent implements OnInit {
  enclosure$: Observable<Enclosure | undefined>;
  boxes$: Observable<Box[]>;
  selectedBox$: Observable<Box | undefined>;
  sensorDataMap: Map<string, Map<string, Observable<TimeSeries>>> = new Map();

  constructor(
    private encService: EnclosureService,
    private boxService: BoxService,
    private sensorService: SensorService
  ) {
    this.enclosure$ = this.encService.getEnclosure$();
    this.boxes$ = this.boxService.getBoxes$();
    this.selectedBox$ = this.boxService.selectedBox$;
    this.boxes$
      .pipe(
        map((boxes) => {
          const sensorDataMap: Map<
            string,
            Map<string, Observable<TimeSeries>>
          > = new Map();
          boxes.forEach((box) => {
            const boxSensors = sensorDataMap.get(box.id) || new Map();
            box.sensors.forEach((sensor) => {
              boxSensors.set(
                sensor.id,
                this.sensorService.getSensorData(box.id, sensor.id)
              );
            });
            sensorDataMap.set(box.id, boxSensors);
          });
          return sensorDataMap;
        })
      )
      .subscribe((sensorMap) => {
        this.sensorDataMap = sensorMap;
      });
  }

  ngOnInit(): void {}
  selectBox(box: Box) {
    localStorage.setItem('pbox2_selected_box', box.id);
    this.boxService.selectBox(box);
  }
}
