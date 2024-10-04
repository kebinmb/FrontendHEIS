import { TestBed } from '@angular/core/testing';

import { EmailMultipleService } from './email-multiple.service';

describe('EmailMultipleService', () => {
  let service: EmailMultipleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailMultipleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
