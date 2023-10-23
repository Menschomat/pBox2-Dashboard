import { SocketEvent } from './../model/events/socket-event';
import { Injectable } from '@angular/core';
import {
  Observable,
  retry,
  RetryConfig,
  BehaviorSubject,
  timeout,
  catchError,
  tap,
} from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const timeoutDuration = 10000;

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private sockState: BehaviorSubject<'connected' | 'pending' | 'disconnected'> =
    new BehaviorSubject<'connected' | 'pending' | 'disconnected'>(
      'disconnected'
    );
  // Determine the protocol to use
  private protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

  // Construct the URL
  private webSocketUrl = `${this.protocol}//${window.location.host}/ws/subscribe`;
  private webSocket: WebSocketSubject<SocketEvent> = webSocket({
    url: this.webSocketUrl,
    openObserver: {
      next: () => this.isConnected.next(true),
    },
    closeObserver: {
      next: () => this.isConnected.next(false),
    },
  });
  constructor() {
    this.watchSocket();
  }

  private watchSocket() {
    this.webSocket
      .asObservable()
      .pipe(
        timeout(timeoutDuration),
        catchError(() => {
          setTimeout(() => {
            if (this.sockState.value === 'connected') {
              if (this.isConnected.value === true)
                this.sockState.next('pending');
              else this.sockState.next('disconnected');
            }
            this.watchSocket();
          }, 1000);
          return [];
        })
      )
      .subscribe(() => {
        if (this.sockState.value !== 'connected')
          this.sockState.next('connected');
      });
  }

  public getWebsocket(): Observable<SocketEvent> {
    const retryConfig: RetryConfig = {
      delay: 3000,
    };
    return this.webSocket.asObservable().pipe(
      tap((event) => console.log(event)),
      retry(retryConfig) //support auto reconnect
    );
  }
  public isConnected$() {
    return this.isConnected.asObservable();
  }
  public getSockState$() {
    return this.sockState.asObservable();
  }
}
