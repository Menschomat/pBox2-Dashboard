export interface Enclosure {
  id: string;
  name: string;
  location: string;
  boxes: Box[];
}

export interface Box {
  id: string;
  name: string;
  location: string;
  lights: Light[];
  fans: Fan[];
  sensors: Sensor[];
  switches: Switch[];
}

export interface Fan {
  id: string;
  name: string;
  level: number;
}
export interface Switch {
  id: string;
  name: string;
  state: boolean;
}
export interface Light {
  id: string;
  name: string;
  level: number;
  type: string;
}

export interface Sensor {
  id: string;
  name: string;
  type: string;
  unit: string;
}
export interface TimeSeries {
  values: number[];
  times: string[];
}
