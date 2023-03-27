import { SocketEvent } from './socket-event';
export interface SensorEvent extends SocketEvent {
  body: SensorEventBody;
}

export interface SensorEventBody {
  id: string;
  type: string;
  unit: string;
  value: number;
  time: string;
}
