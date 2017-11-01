import { TestBed, inject } from '@angular/core/testing';

import { VerifiedService } from './verified.service';

describe('VerifiedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerifiedService]
    });
  });

  it('should ...', inject([VerifiedService], (service: VerifiedService) => {
    expect(service).toBeTruthy();
  }));
});
