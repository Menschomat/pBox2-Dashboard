import { LightService } from './../../services/light.service';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Light } from './../../model/enclosure';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
})
export class LightComponent implements OnInit, OnDestroy {
  @Input()
  encId!: string;
  @Input()
  boxId!: string;
  @Input()
  lightId!: string;

  light: Light | undefined;

  private lightUpdateSubj: Subject<Light> = new Subject();
  private lightSubscription: Subscription | undefined;

  constructor(
    private lightService: LightService,
    private cd: ChangeDetectorRef
  ) {
    this.lightUpdateSubj.pipe(debounceTime(500)).subscribe((light) => {
      if (this.boxId && this.light)
        this.lightService
          .updateLight(this.boxId, this.light)
          .subscribe((light) => light);
    });
  }
  ngOnInit(): void {
    this.lightSubscription = this.lightService
      .getLight(this.boxId, this.lightId, this.encId)
      .subscribe((aLight) => (this.light = aLight));
  }
  ngOnDestroy(): void {
    if (!this.lightSubscription || this.lightSubscription.closed) return;
    this.lightSubscription.unsubscribe();
  }
  updateLightData() {
    if (this.light) this.lightUpdateSubj.next(this.light);
  }
}
