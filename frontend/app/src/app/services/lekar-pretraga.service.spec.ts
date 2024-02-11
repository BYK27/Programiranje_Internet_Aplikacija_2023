import { TestBed } from '@angular/core/testing';

import { LekarPretragaService } from './lekar-pretraga.service';

describe('LekarPretragaService', () => {
  let service: LekarPretragaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LekarPretragaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
