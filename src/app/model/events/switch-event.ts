import { SocketEvent } from './socket-event';
export interface SwitchEvent extends SocketEvent {
  body: SwitchEventBody;
}
export interface SwitchEventBody {
  id: string;
  name: string;
  state: boolean;
}
