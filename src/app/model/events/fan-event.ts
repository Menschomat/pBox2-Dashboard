import { SocketEvent } from './socket-event';
export interface FanEvent extends SocketEvent {
  body: FanEventBody;
}
export interface FanEventBody {
  id: string;
  name: string;
  value: number;
}
