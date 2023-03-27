export interface SocketEvent {
  time: string;
  type: SocketEventType;
  topic: string;
  body: any;
}
export enum SocketEventType {
  SENSOR = 'SENSOR',
  LIGHT = 'LIGHT',
  FAN = 'FAN',
}
