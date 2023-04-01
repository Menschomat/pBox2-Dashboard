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
  constructor(private http: HttpClient) {
    this.fetchEnclosureConfig().subscribe((enc) =>
      this.enclosureSubject.next(enc)
    );
  }

  public getEnclosure$(): Observable<Enclosure | undefined> {
    return this.enclosureSubject.asObservable();
  }

  private fetchEnclosureConfig(): Observable<Enclosure> {
    return this.http.get<Enclosure>('/api/v1/enclosure');
  }


}
