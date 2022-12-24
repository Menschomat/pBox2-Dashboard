import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnclosureComponent } from './enclosure.component';

describe('EnclosureComponent', () => {
  let component: EnclosureComponent;
  let fixture: ComponentFixture<EnclosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnclosureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
