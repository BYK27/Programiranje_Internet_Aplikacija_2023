import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzvestajPrintableAllComponent } from './izvestaj-printable-all.component';

describe('IzvestajPrintableAllComponent', () => {
  let component: IzvestajPrintableAllComponent;
  let fixture: ComponentFixture<IzvestajPrintableAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IzvestajPrintableAllComponent]
    });
    fixture = TestBed.createComponent(IzvestajPrintableAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
