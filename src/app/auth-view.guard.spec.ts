import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authViewGuard } from './auth-view.guard';

describe('authViewGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authViewGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
