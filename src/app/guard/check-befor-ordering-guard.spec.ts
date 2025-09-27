import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkBeforOrderingGuard } from './check-befor-ordering-guard';

describe('checkBeforOrderingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkBeforOrderingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
