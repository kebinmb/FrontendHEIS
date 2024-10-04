import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmdialogComponent } from './confirmdialog.component';

describe('ConfirmdialogComponent', () => {
  let component: ConfirmdialogComponent;
  let fixture: ComponentFixture<ConfirmdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmdialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
