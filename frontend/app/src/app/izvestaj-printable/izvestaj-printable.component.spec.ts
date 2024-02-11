import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajPrintableComponent } from './izvestaj-printable.component';

describe('IzvestajPrintableComponent', () => {
  let component: IzvestajPrintableComponent;
  let fixture: ComponentFixture<IzvestajPrintableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IzvestajPrintableComponent]
    });
    fixture = TestBed.createComponent(IzvestajPrintableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
