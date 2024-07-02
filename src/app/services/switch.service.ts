import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, startWith, switchMap } from 'rxjs';
import { Switch } from '../model/enclosure';
import { WebSocketService } from './web-socket.service';
import { SocketEventType } from '../model/events/socket-event';
import { SwitchEventBody } from '../model/events/switch-event';

@Injectable({
  providedIn: 'root',
})
export class SwitchService {
  constructor(private http: HttpClient, private webSocket: WebSocketService) {}

  public getSwitch(
    boxId: string,
    switchId: string,
    encId: string
  ): Observable<Switch> {
    return this.getInitialData(boxId, switchId).pipe(
      switchMap((initialData) => {
        return this.webSocket.getWebsocket().pipe(
          filter((event) => event.type === SocketEventType.SWITCH),
          filter((event) => event.topic === `${encId}/${boxId}`),
          map((event) => event.body as SwitchEventBody),
          filter((body) => body.id === switchId),
          map((event) => {
            return { id: event.id, state: event.state, name: event.name } as Switch;
          }),
          startWith(initialData)
        );
      })
    );
  }

  public updateSwitch(boxId: string, switc: Switch): Observable<Switch> {
    return this.http.post<Switch>(
      `/api/v1/${boxId}/switches/${switc.id}`,
      switc
    );
  }

  private getInitialData(boxId: string, switchId: string): Observable<Switch> {
    return this.http.get<Switch>(`/api/v1/${boxId}/switches/${switchId}`);
  }
}
