import { TestBed } from '@angular/core/testing';

import { EmailGroupService } from './email-group.service';

describe('EmailGroupService', () => {
  let service: EmailGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
