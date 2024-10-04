import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailIndividualComponent } from './email-individual.component';

describe('EmailIndividualComponent', () => {
  let component: EmailIndividualComponent;
  let fixture: ComponentFixture<EmailIndividualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailIndividualComponent]
    });
    fixture = TestBed.createComponent(EmailIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
