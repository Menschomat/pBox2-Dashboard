import { Subject, Subscription, debounceTime } from 'rxjs';
import { FanService } from 'src/app/services/fan.service';
import { Fan } from './../../model/enclosure';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-fan',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  constructor(private fanService: FanService, private cd: ChangeDetectorRef) {
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
        this.cd.markForCheck();
      });
  }
  ngOnDestroy(): void {
    if (!this.fanSubscription || this.fanSubscription.closed) return;
    this.fanSubscription?.unsubscribe();
  }
  updateFanData() {
    if (!this.fan) return;
    this.fanUpdateSubj.next(this.fan);
  }
}
