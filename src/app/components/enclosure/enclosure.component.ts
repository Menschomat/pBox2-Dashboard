import { Enclosure, Box, TimeSeries } from './../../model/enclosure';
import { EnclosureService } from './../../services/enclosure.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-enclosure',
  templateUrl: './enclosure.component.html',
  styleUrls: ['./enclosure.component.scss'],
})
export class EnclosureComponent implements OnInit {
  enclosure$: Observable<Enclosure>;
  boxes$: Observable<Box[]>;
  encName$: Observable<String>;
  sensorDataMap: Map<string, Map<string, Observable<TimeSeries>>> = new Map();

  constructor(private encService: EnclosureService) {
    this.enclosure$ = this.encService.getEnclosureConfig();
    this.boxes$ = this.encService.getBoxes();
    this.encName$ = this.enclosure$.pipe(map((enc) => enc.name));
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
                this.encService.getSensorData(box.id, sensor.id)
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
}
