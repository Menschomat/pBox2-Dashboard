import { Fan } from './../../model/enclosure';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fan',
  templateUrl: './fan.component.html',
  styleUrls: ['./fan.component.scss'],
})
export class FanComponent {
  @Input()
  fan: Fan | undefined;
}
