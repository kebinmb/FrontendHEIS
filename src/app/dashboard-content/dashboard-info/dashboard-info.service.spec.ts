import { TestBed } from '@angular/core/testing';

import { DashboardInfoService } from './dashboard-info.service';

describe('DashboardInfoService', () => {
  let service: DashboardInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
