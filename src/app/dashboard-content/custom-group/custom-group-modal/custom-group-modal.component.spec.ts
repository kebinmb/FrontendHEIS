import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGroupModalComponent } from './custom-group-modal.component';

describe('CustomGroupModalComponent', () => {
  let component: CustomGroupModalComponent;
  let fixture: ComponentFixture<CustomGroupModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomGroupModalComponent]
    });
    fixture = TestBed.createComponent(CustomGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
