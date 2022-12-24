import { Observable, map } from 'rxjs';
import { Enclosure, Box } from './../model/enclosure';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnclosureService {
  constructor(private http: HttpClient) {}

  getEnclosureConfig():Observable<Enclosure> {
    return this.http.get<Enclosure>('/api/v1/enclosure');
  }

  getBoxes():Observable<Box[]> {
    return this.http.get<Enclosure>('/api/v1/enclosure').pipe(map(enc => enc.boxes));
  }
}
