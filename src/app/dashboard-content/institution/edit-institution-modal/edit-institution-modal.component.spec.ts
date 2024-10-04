import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitutionModalComponent } from './edit-institution-modal.component';

describe('EditInstitutionModalComponent', () => {
  let component: EditInstitutionModalComponent;
  let fixture: ComponentFixture<EditInstitutionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInstitutionModalComponent]
    });
    fixture = TestBed.createComponent(EditInstitutionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
