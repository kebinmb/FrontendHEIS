import { TestBed } from '@angular/core/testing';

import { ReceiverModalServiceService } from './receiver-modal-service.service';

describe('ReceiverModalServiceService', () => {
  let service: ReceiverModalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceiverModalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
