import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentStrengthComponent } from './admin-student-strength.component';

describe('AdminStudentStrengthComponent', () => {
  let component: AdminStudentStrengthComponent;
  let fixture: ComponentFixture<AdminStudentStrengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentStrengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentStrengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
