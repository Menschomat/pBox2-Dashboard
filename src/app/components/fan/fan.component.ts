import { Subject, debounceTime } from 'rxjs';
import { FanService } from 'src/app/services/fan.service';
import { Fan } from './../../model/enclosure';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss'],
})
export class FanComponent {
  private fanUpdateSubj: Subject<Fan> = new Subject();

  @Input()
  boxId: string | undefined;

  @Input()
  fan: Fan | undefined;

  constructor(private fanService: FanService) {
    this.fanUpdateSubj.pipe(debounceTime(500)).subscribe((fan) => {
      if (this.boxId && this.fan)
        this.fanService.updateFan(this.boxId, this.fan).subscribe((fan) => fan);
    });
  }

  updateFanData() {
    if (this.fan) this.fanUpdateSubj.next(this.fan);
  }
}
