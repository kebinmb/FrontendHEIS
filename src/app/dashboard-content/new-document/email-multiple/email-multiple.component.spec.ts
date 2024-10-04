import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMultipleComponent } from './email-multiple.component';

describe('EmailMultipleComponent', () => {
  let component: EmailMultipleComponent;
  let fixture: ComponentFixture<EmailMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailMultipleComponent]
    });
    fixture = TestBed.createComponent(EmailMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
