import { TestBed } from '@angular/core/testing';

import { PreachingsService } from './preachings.service';

describe('PreachingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreachingsService = TestBed.get(PreachingsService);
    expect(service).toBeTruthy();
  });
});
