import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Switch } from '../model/enclosure';

@Injectable({
  providedIn: 'root',
})
export class SwitchService {
  constructor(private http: HttpClient) {}
  public getSwitch(boxId: string, switchId: string): Observable<Switch> {
    return this.http.get<Switch>(`/api/v1/${boxId}/switches/${switchId}`);
  }
  public updateSwitch(boxId: string, switc: Switch): Observable<Switch> {
    return this.http.post<Switch>(
      `/api/v1/${boxId}/switches/${switc.id}`,
      switc
    );
  }
}
