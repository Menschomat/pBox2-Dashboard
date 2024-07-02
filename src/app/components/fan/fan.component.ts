import { Observable, Subject, Subscription, debounceTime } from 'rxjs';
import { FanService } from 'src/app/services/fan.service';
import { Fan } from './../../model/enclosure';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SwitchService } from 'src/app/services/switch.service';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss'],
})
export class FanComponent implements OnInit, OnDestroy {
  private fanUpdateSubj: Subject<Fan> = new Subject();

  @Input()
  encId!: string;
  @Input()
  boxId!: string;
  @Input()
  fanId!: string;
  public fan: Fan | undefined;

  private fanSubscription: Subscription | undefined;
  constructor(private fanService: FanService) {
    this.fanUpdateSubj
      .pipe(debounceTime(500))
      .subscribe((fan) =>
        this.fanService.updateFan(this.boxId, fan).subscribe((fan) => fan)
      );
  }
  ngOnInit(): void {
    this.fanSubscription = this.fanService
      .getFan(this.boxId, this.fanId, this.encId)
      .subscribe((aFan) => {
        this.fan = aFan;
      });
  }
  ngOnDestroy(): void {
    if (this.fanSubscription?.closed) return;
    this.fanSubscription?.unsubscribe();
  }
  updateFanData() {
    if (!this.fan) return;
    this.fanUpdateSubj.next(this.fan);
  }
}
