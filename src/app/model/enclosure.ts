export interface Enclosure {
    id:       string;
    name:     string;
    location: string;
    boxes:    Box[];
}

export interface Box {
    id:       string;
    name:     string;
    location: string;
    lights:   Light[];
    fans:     Fan[];
    sensors:  Sensor[];
}

export interface Fan {
    id:   string;
    name: string;
    pin:  number;
}

export interface Light {
    id:   string;
    name: string;
    pins: number[];
    type: string;
}

export interface Sensor {
    id:   string;
    name: string;
    pin:  number;
    type: string;
    unit: string;
}