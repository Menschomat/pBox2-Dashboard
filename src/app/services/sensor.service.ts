import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor, TimeSeries } from '../model/enclosure';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  constructor(private http: HttpClient) {}
  public getSensor(boxId: string, sensorId: string): Observable<Sensor> {
    return this.http.get<Sensor>(`/api/v1/${boxId}/sensors/${sensorId}`);
  }
  public getSensorData(
    boxId: string,
    sensorId: string
  ): Observable<TimeSeries> {
    return this.http.get<TimeSeries>(
      `/api/v1/${boxId}/sensors/${sensorId}/data`
    );
  }
}
