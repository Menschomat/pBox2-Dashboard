import { WebSocketService } from 'src/app/services/web-socket.service';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit, OnDestroy {
  private color: 'green' | 'yellow' | 'red' = 'red';
  private pulse: boolean = true;
  @HostBinding('class')
  private class: string[] = [];

  private sockSubscription: Subscription | undefined;

  constructor(private webSocket: WebSocketService) {}
  ngOnInit(): void {
    this.sockSubscription = this.webSocket
      .getSockState$()
      .subscribe((state) => {
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
  ngOnDestroy(): void {
    if (!this.sockSubscription || this.sockSubscription.closed) return;
    this.sockSubscription.unsubscribe();
  }
}
