import { Light } from './../../model/enclosure';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent {
  @Input()
  light: Light | undefined;
}
