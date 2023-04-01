import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fan } from '../model/enclosure';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FanService {
  constructor(private http: HttpClient) {}
  public getFan(boxId: string, fanId: string): Observable<Fan> {
    return this.http.get<Fan>(`/api/v1/${boxId}/fans/${fanId}`);
  }
}
