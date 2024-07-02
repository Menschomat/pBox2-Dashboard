import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Box } from '../model/enclosure';
import { EnclosureService } from './enclosure.service';

@Injectable({
  providedIn: 'root',
})
export class BoxService {
  private selectedBox: BehaviorSubject<Box | undefined> = new BehaviorSubject<
    Box | undefined
  >(undefined);
  public selectedBox$: Observable<Box | undefined> =
    this.selectedBox.asObservable();

  constructor(private enclosureService: EnclosureService) {}

  public getBoxes$(): Observable<Box[]> {
    return this.enclosureService.getEnclosure$().pipe(
      map((enc) => enc?.boxes ?? []),
      tap((boxes) => {
        if (this.selectedBox.value === undefined && boxes.length > 0) {
          const possibleLastBox = boxes.find(
            (box) => box.id == localStorage.getItem('pbox2_selected_box')
          );
          this.selectedBox.next(possibleLastBox ? possibleLastBox : boxes[0]);
        }
      })
    );
  }
  selectBox(box: Box) {
    this.selectedBox.next(box);
  }
}
