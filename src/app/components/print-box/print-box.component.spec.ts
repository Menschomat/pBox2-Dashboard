import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBoxComponent } from './print-box.component';

describe('PrintBoxComponent', () => {
  let component: PrintBoxComponent;
  let fixture: ComponentFixture<PrintBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
