import { LightService } from './../../services/light.service';
import { Subject, debounceTime } from 'rxjs';
import { Light } from './../../model/enclosure';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss'],
})
export class LightComponent {
  private lightUpdateSubj: Subject<Light> = new Subject();

  @Input()
  boxId: string | undefined;

  @Input()
  light: Light | undefined;

  constructor(private lightService: LightService) {
    this.lightUpdateSubj.pipe(debounceTime(500)).subscribe((light) => {
      if (this.boxId && this.light)
        this.lightService
          .updateLight(this.boxId, this.light)
          .subscribe((light) => light);
    });
  }

  updateLightData() {
    if (this.light) this.lightUpdateSubj.next(this.light);
  }
}
