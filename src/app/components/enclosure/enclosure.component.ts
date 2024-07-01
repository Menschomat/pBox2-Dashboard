import { BoxService } from 'src/app/services/box.service';
import { Enclosure, Box } from './../../model/enclosure';
import { EnclosureService } from './../../services/enclosure.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-enclosure',
  templateUrl: './enclosure.component.html',
  styleUrls: ['./enclosure.component.scss'],
})
export class EnclosureComponent implements OnInit {
  enclosure$: Observable<Enclosure | undefined>;
  boxes$: Observable<Box[]>;
  selectedBox$: Observable<Box | undefined>;

  constructor(
    private encService: EnclosureService,
    private boxService: BoxService
  ) {
    this.enclosure$ = this.encService.getEnclosure$();
    this.boxes$ = this.boxService.getBoxes$();
    this.selectedBox$ = this.boxService.selectedBox$;
  }

  ngOnInit(): void {}
  selectBox(box: Box) {
    localStorage.setItem('pbox2_selected_box', box.id);
    this.boxService.selectBox(box);
  }
}
