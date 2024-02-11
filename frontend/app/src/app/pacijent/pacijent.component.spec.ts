import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacijentComponent } from './pacijent.component';

describe('PacijentComponent', () => {
  let component: PacijentComponent;
  let fixture: ComponentFixture<PacijentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacijentComponent]
    });
    fixture = TestBed.createComponent(PacijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
