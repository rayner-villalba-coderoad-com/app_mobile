import { TestBed } from '@angular/core/testing';

import { PrayingService } from './praying.service';

describe('PrayingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrayingService = TestBed.get(PrayingService);
    expect(service).toBeTruthy();
  });
});
