import { Enclosure, Box } from './../../model/enclosure';
import { EnclosureService } from './../../services/enclosure.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-enclosure',
  templateUrl: './enclosure.component.html',
  styleUrls: ['./enclosure.component.scss'],
})
export class EnclosureComponent implements OnInit {
  enclosure$: Observable<Enclosure>;
  boxes$: Observable<Box[]>;
  encName$: Observable<String>;

  constructor(private encService: EnclosureService) {
    this.enclosure$ = this.encService.getEnclosureConfig();
    this.boxes$ = this.encService.getBoxes();
    this.encName$ = this.enclosure$.pipe(map(enc => enc.name))
  }

  ngOnInit(): void {}
}
