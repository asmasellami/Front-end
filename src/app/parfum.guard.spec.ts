import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { parfumGuard } from './parfum.guard';

describe('parfumGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => parfumGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
