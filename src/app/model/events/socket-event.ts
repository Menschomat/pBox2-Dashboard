export interface SocketEvent {
  time: string;
  type: SocketEventType;
  topic: string;
  body: any;
}
export enum SocketEventType {
  SENSOR = 'SENSOR',
  SWITCH = 'SWITCH',
  LIGHT = 'LIGHT',
  FAN = 'FAN',
}
