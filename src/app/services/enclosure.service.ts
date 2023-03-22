import { Observable, Subject, map, BehaviorSubject } from 'rxjs';
import { Enclosure, Box, TimeSeries } from './../model/enclosure';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnclosureService {
  private enclosureSubject: BehaviorSubject<Enclosure | undefined> =
    new BehaviorSubject<Enclosure | undefined>(undefined);
  public enclosure$: Observable<Enclosure | undefined> =
    this.enclosureSubject.asObservable();

  constructor(private http: HttpClient) {}

  getEnclosureConfig(): Observable<Enclosure> {
    return this.http.get<Enclosure>('/api/v1/enclosure');
  }

  getBoxes(): Observable<Box[]> {
    return this.http
      .get<Enclosure>('/api/v1/enclosure')
      .pipe(map((enc) => enc.boxes));
  }
  getSensorData(boxId: string, sensorId: string): Observable<TimeSeries> {
    return this.http.get<TimeSeries>(
      `/api/v1/${boxId}/sensors/${sensorId}/data`
    );
  }
}
