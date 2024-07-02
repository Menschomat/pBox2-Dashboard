import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, startWith, switchMap } from 'rxjs';
import { Light } from '../model/enclosure';
import { LightEventBody } from '../model/events/light-event';
import { SocketEventType } from '../model/events/socket-event';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class LightService {
  constructor(private http: HttpClient, private webSocket: WebSocketService) {}

  public getLight(
    boxId: string,
    fanId: string,
    encId: string
  ): Observable<Light> {
    return this.getInitialData(boxId, fanId).pipe(
      switchMap((initialData) => {
        return this.webSocket.getWebsocket().pipe(
          filter((event) => event.type === SocketEventType.LIGHT),
          filter((event) => event.topic === `${encId}/${boxId}`),
          map((event) => event.body as LightEventBody),
          filter((body) => body.id === fanId),
          map((event) => {
            console.log(event);
            return {
              id: event.id,
              level: event.value,
              name: event.name,
            } as Light;
          }),
          startWith(initialData)
        );
      })
    );
  }

  private getInitialData(boxId: string, lightId: string): Observable<Light> {
    return this.http.get<Light>(`/api/v1/${boxId}/lights/${lightId}`);
  }
  public updateLight(boxId: string, light: Light): Observable<Light> {
    return this.http.post<Light>(`/api/v1/${boxId}/lights/${light.id}`, light);
  }
}
