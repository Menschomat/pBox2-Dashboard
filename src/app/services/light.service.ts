import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Light } from '../model/enclosure';

@Injectable({
  providedIn: 'root',
})
export class LightService {
  constructor(private http: HttpClient) {}
  public getFan(boxId: string, lightId: string): Observable<Light> {
    return this.http.get<Light>(`/api/v1/${boxId}/fans/${lightId}`);
  }
}
