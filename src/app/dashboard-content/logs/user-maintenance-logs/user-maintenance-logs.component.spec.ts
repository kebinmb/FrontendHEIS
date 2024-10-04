import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMaintenanceLogsComponent } from './user-maintenance-logs.component';

describe('UserMaintenanceLogsComponent', () => {
  let component: UserMaintenanceLogsComponent;
  let fixture: ComponentFixture<UserMaintenanceLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMaintenanceLogsComponent]
    });
    fixture = TestBed.createComponent(UserMaintenanceLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
