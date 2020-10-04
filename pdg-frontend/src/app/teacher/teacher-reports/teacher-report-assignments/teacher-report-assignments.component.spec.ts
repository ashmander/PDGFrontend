import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherReportAssignmentsComponent } from './teacher-report-assignments.component';

describe('TeacherReportAssignmentsComponent', () => {
  let component: TeacherReportAssignmentsComponent;
  let fixture: ComponentFixture<TeacherReportAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherReportAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherReportAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
