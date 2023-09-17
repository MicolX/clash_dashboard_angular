import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInDialogComponent } from './log-in-dialog.component';

describe('LogInDialogComponent', () => {
  let component: LogInDialogComponent;
  let fixture: ComponentFixture<LogInDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
