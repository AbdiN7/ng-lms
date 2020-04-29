import { TestBed } from '@angular/core/testing';

import { BranchHttpService } from './branch-http.service';

describe('BranchHttpService', () => {
  let service: BranchHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
