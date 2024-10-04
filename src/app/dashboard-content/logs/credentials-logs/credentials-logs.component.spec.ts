import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsLogsComponent } from './credentials-logs.component';

describe('CredentialsLogsComponent', () => {
  let component: CredentialsLogsComponent;
  let fixture: ComponentFixture<CredentialsLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredentialsLogsComponent]
    });
    fixture = TestBed.createComponent(CredentialsLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
