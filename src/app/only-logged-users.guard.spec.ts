import { TestBed } from '@angular/core/testing';

import { OnlyLoggedUsersGuard } from './only-logged-users.guard';

describe('OnlyLoggedUsersGuard', () => {
  let guard: OnlyLoggedUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyLoggedUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
