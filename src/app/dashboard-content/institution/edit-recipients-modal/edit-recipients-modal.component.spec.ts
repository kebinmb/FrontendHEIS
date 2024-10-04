import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipientsModalComponent } from './edit-recipients-modal.component';

describe('EditRecipientsModalComponent', () => {
  let component: EditRecipientsModalComponent;
  let fixture: ComponentFixture<EditRecipientsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRecipientsModalComponent]
    });
    fixture = TestBed.createComponent(EditRecipientsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
