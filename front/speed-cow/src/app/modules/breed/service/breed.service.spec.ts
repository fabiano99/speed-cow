import { TestBed } from '@angular/core/testing';

import { BreedService } from './breed.service';

describe('BreedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreedService = TestBed.get(BreedService);
    expect(service).toBeTruthy();
  });
});
