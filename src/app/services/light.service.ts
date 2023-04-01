import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Light } from '../model/enclosure';

@Injectable({
  providedIn: 'root',
})
export class LightService {
  constructor(private http: HttpClient) {}
  public getLight(boxId: string, lightId: string): Observable<Light> {
    return this.http.get<Light>(`/api/v1/${boxId}/lights/${lightId}`);
  }
  public updateLight(boxId: string, light: Light): Observable<Light> {
    return this.http.post<Light>(`/api/v1/${boxId}/lights/${light.id}`, light);
  }
}
