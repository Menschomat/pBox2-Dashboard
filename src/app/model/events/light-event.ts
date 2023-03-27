import { SocketEvent } from './socket-event';
export interface LightEvent extends SocketEvent {
  body: LightEventBody;
}
export interface LightEventBody {}
