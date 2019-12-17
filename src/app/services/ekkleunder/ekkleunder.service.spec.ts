import { TestBed } from '@angular/core/testing';

import { EkkleunderService } from './ekkleunder.service';

describe('EkkleunderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EkkleunderService = TestBed.get(EkkleunderService);
    expect(service).toBeTruthy();
  });
});
