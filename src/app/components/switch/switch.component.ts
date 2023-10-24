import { Component, Input } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { Switch } from 'src/app/model/enclosure';
import { SwitchService } from 'src/app/services/switch.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  private switchUpdateSubj: Subject<Switch> = new Subject();
  @Input()
  boxId: string | undefined;

  @Input()
  switch: Switch | undefined;

  constructor(private switchService: SwitchService) {
    this.switchUpdateSubj.pipe(debounceTime(500)).subscribe((switc) => {
      if (this.boxId && this.switch)
        this.switchService
          .updateSwitch(this.boxId, this.switch)
          .subscribe((switc) => switc);
    });
  }
  updateSwitchData() {
    if (this.switch) this.switchUpdateSubj.next(this.switch);
  }
}
