import { webSocket } from 'rxjs/webSocket';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fan } from '../model/enclosure';
import { Observable, filter, map, startWith, switchMap } from 'rxjs';
import { SocketEventType } from '../model/events/socket-event';
import { SwitchEventBody } from '../model/events/switch-event';
import { FanEventBody } from '../model/events/fan-event';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class FanService {
  constructor(private http: HttpClient, private webSocket: WebSocketService) {}
  public getInitialData(boxId: string, fanId: string): Observable<Fan> {
    return this.http.get<Fan>(`/api/v1/${boxId}/fans/${fanId}`);
  }

  public getFan(boxId: string, fanId: string, encId: string): Observable<Fan> {
    return this.getInitialData(boxId, fanId).pipe(
      switchMap((initialData) => {
        return this.webSocket.getWebsocket().pipe(
          filter((event) => event.type === SocketEventType.FAN),
          filter((event) => event.topic === `${encId}/${boxId}`),
          map((event) => event.body as FanEventBody),
          filter((body) => body.id === fanId),
          map((event) => {
            console.log(event)
            return { id: event.id, level: event.value, name: event.name } as Fan;
          }),
          startWith(initialData)
        );
      })
    );
  }
  public updateFan(boxId: string, fan: Fan): Observable<Fan> {
    console.log(fan)
    return this.http.post<Fan>(`/api/v1/${boxId}/fans/${fan.id}`, fan);
  }
}
