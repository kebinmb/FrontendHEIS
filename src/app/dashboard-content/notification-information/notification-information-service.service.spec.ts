import { TestBed } from '@angular/core/testing';

import { NotificationInformationServiceService } from './notification-information-service.service';

describe('NotificationInformationServiceService', () => {
  let service: NotificationInformationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationInformationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
