import { TestBed } from '@angular/core/testing';

import { CustomGroupService } from './custom-group.service';

describe('CustomGroupService', () => {
  let service: CustomGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
