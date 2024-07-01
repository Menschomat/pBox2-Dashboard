import { TimeSeries } from './../model/enclosure';
import { WebSocketService } from './web-socket.service';
import { Injectable } from '@angular/core';
import {
  Observable,
  filter,
  map,
  scan,
  startWith,
  switchMap,
} from 'rxjs';
import { Sensor } from '../model/enclosure';
import { HttpClient } from '@angular/common/http';
import { SensorEventBody } from '../model/events/sensor-event';
import { SocketEventType } from '../model/events/socket-event';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  constructor(private http: HttpClient, private webSocket: WebSocketService) {}
  public getSensor(boxId: string, sensorId: string): Observable<Sensor> {
    return this.http.get<Sensor>(`/api/v1/${boxId}/sensors/${sensorId}`);
  }
  private getInitialData(
    boxId: string,
    sensorId: string
  ): Observable<TimeSeries> {
    return this.http.get<TimeSeries>(
      `/api/v1/${boxId}/sensors/${sensorId}/data`
    );
  }
  public getSensorData(
    boxId: string,
    sensorId: string,
    encId: string
  ): Observable<TimeSeries> {
    return this.getInitialData(boxId, sensorId).pipe(
      switchMap((initialData) => {
        return this.webSocket.getWebsocket().pipe(
          filter((event) => event.type === SocketEventType.SENSOR),
          filter((event) => event.topic === `${encId}/${boxId}`),
          map((event) => event.body as SensorEventBody),
          filter((body) => body.id === sensorId),
          map((event) => {
            return { values: [event.value], times: [event.time] } as TimeSeries;
          }),
          startWith(initialData),
          scan((acc: TimeSeries, msg) => {
            acc.times.push(...msg.times);
            acc.values.push(...msg.values);
            if (acc.times.length > 500) {
              acc.times.shift();
              acc.values.shift();
            }
            return acc;
          })
        );
      })
    );
  }
}
