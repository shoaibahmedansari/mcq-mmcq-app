import { TestBed } from '@angular/core/testing';

import { MsqdataService } from './msqdata.service';

describe('MsqdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsqdataService = TestBed.get(MsqdataService);
    expect(service).toBeTruthy();
  });
});
