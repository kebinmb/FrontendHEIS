import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsDocumentComponent } from './logs-document.component';

describe('LogsDocumentComponent', () => {
  let component: LogsDocumentComponent;
  let fixture: ComponentFixture<LogsDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsDocumentComponent]
    });
    fixture = TestBed.createComponent(LogsDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
