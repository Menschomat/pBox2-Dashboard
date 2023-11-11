import { LightService } from './../../services/light.service';
import { Subject, debounceTime, filter, map } from 'rxjs';
import { Light } from './../../model/enclosure';
import { Component, Input, OnInit, Output } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { SocketEventType } from 'src/app/model/events/socket-event';
import { LightEventBody } from 'src/app/model/events/light-event';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
})
export class LightComponent implements OnInit {
  private lightUpdateSubj: Subject<Light> = new Subject();
  @Input()
  encId?: string | null;
  @Input()
  boxId: string | undefined;

  @Input()
  light: Light | undefined;

  constructor(
    private lightService: LightService,
    private webSocket: WebSocketService
  ) {
    this.lightUpdateSubj.pipe(debounceTime(500)).subscribe((light) => {
      if (this.boxId && this.light)
        this.lightService
          .updateLight(this.boxId, this.light)
          .subscribe((light) => light);
    });
  }
  ngOnInit(): void {
    this.webSocket
      .getWebsocket()
      .pipe(
        filter((event) => event.type == SocketEventType.LIGHT),
        filter((event) => event.topic == `${this.encId}/${this.boxId}`),
        map((event) => event.body as LightEventBody),
        filter((body) => body.id == this.light?.id)
      )
      .subscribe((msg) => {
        if (this.light) {
          this.light.level = msg.value;
          this.updateLightData();
        }
      });
  }

  updateLightData() {
    if (this.light) this.lightUpdateSubj.next(this.light);
  }
}
