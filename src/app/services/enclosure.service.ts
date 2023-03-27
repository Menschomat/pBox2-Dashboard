import { Observable, map, BehaviorSubject, tap } from 'rxjs';
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
  private selectedBox: BehaviorSubject<Box | undefined> = new BehaviorSubject<
    Box | undefined
  >(undefined);
  public selectedBox$: Observable<Box | undefined> =
    this.selectedBox.asObservable();
  constructor(private http: HttpClient) {}

  getEnclosureConfig(): Observable<Enclosure> {
    return this.http.get<Enclosure>('/api/v1/enclosure');
  }

  getBoxes(): Observable<Box[]> {
    return this.http.get<Enclosure>('/api/v1/enclosure').pipe(
      map((enc) => enc.boxes),
      tap((boxes) => {
        if (this.selectedBox.value === undefined && boxes.length > 0) {
          const possibleLastBox = boxes.find(
            (box) => box.id == localStorage.getItem('pbox2_selected_box')
          );
          this.selectedBox.next(possibleLastBox ? possibleLastBox : boxes[0]);
        }
      })
    );
  }
  selectBox(box: Box) {
    this.selectedBox.next(box);
  }
  getSensorData(boxId: string, sensorId: string): Observable<TimeSeries> {
    return this.http.get<TimeSeries>(
      `/api/v1/${boxId}/sensors/${sensorId}/data`
    );
  }
}
