import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleguard2Guard } from './roleguard2.guard';

describe('roleguard2Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleguard2Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
