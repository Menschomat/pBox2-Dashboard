import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Switch } from 'src/app/model/enclosure';
import { SwitchService } from 'src/app/services/switch.service';

@Component({
  selector: 'app-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent implements OnInit, OnDestroy {
  @Input()
  encId!: string;
  @Input()
  boxId!: string;
  @Input()
  switchId!: string;

  switch: Switch | undefined;

  private swtSubscription: Subscription | undefined;

  constructor(
    private switchService: SwitchService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.swtSubscription = this.switchService
      .getSwitch(this.boxId, this.switchId, this.encId)
      .subscribe((switc) => {
        this.switch = switc;
        this.cd.markForCheck();
      });
  }
  updateSwitchData() {
    if (this.switch)
      this.switchService
        .updateSwitch(this.boxId, this.switch)
        .subscribe((switc) => switc);
  }
  ngOnDestroy(): void {
    if (this.swtSubscription?.closed) return;
    this.swtSubscription?.unsubscribe();
  }
}
