import { WebSocketService } from 'src/app/services/web-socket.service';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent {
  color: 'green' | 'yellow' | 'red' = 'red';
  pulse: boolean = true;
  @HostBinding('class') class: string[] = [];

  constructor(private webSocket: WebSocketService) {
    webSocket.getSockState$().subscribe((state) => {
      if (state === 'connected') {
        this.color = 'green';
        this.pulse = true;
      } else if (state === 'pending') {
        this.color = 'yellow';
        this.pulse = false;
      } else {
        this.color = 'red';
        this.pulse = false;
      }
      this.class = this.pulse
        ? [this.color, `${this.color}-pulse`]
        : [this.color];
    });
  }
}
