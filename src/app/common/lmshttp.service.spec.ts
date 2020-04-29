import { TestBed } from '@angular/core/testing';

import { LmshttpService } from './lmshttp.service';

describe('LmshttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LmshttpService = TestBed.get(LmshttpService);
    expect(service).toBeTruthy();
  });
});
