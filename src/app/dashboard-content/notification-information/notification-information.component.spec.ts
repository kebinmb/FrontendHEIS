import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationInformationComponent } from './notification-information.component';

describe('NotificationInformationComponent', () => {
  let component: NotificationInformationComponent;
  let fixture: ComponentFixture<NotificationInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationInformationComponent]
    });
    fixture = TestBed.createComponent(NotificationInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
