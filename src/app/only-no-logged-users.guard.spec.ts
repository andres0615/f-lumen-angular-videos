import { TestBed } from '@angular/core/testing';

import { OnlyNoLoggedUsersGuard } from './only-no-logged-users.guard';

describe('OnlyNoLoggedUsersGuard', () => {
  let guard: OnlyNoLoggedUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyNoLoggedUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
