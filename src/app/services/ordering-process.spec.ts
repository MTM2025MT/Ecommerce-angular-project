import { TestBed } from '@angular/core/testing';

import { OrderingProcess } from './ordering-process';

describe('OrderingProcess', () => {
  let service: OrderingProcess;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderingProcess);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
