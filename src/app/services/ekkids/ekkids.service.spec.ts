import { TestBed } from '@angular/core/testing';

import { EkkidsService } from './ekkids.service';

describe('EkkidsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EkkidsService = TestBed.get(EkkidsService);
    expect(service).toBeTruthy();
  });
});
