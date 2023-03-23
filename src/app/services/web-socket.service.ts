import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  myWebSocket: WebSocketSubject<any> = webSocket(
    'ws://localhost:8080/subscribe'
  );
  constructor() {}

  public getWebsocket(): Observable<any> {
    return this.myWebSocket.asObservable();
  }
}
