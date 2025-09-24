import { TestBed } from '@angular/core/testing';

import { SharedSearchvalue } from './shared-searchvalue';

describe('SharedSearchvalue', () => {
  let service: SharedSearchvalue;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSearchvalue);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
