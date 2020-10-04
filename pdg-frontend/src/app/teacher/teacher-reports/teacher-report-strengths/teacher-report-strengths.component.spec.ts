import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherReportStrengthsComponent } from './teacher-report-strengths.component';

describe('TeacherReportStrengthsComponent', () => {
  let component: TeacherReportStrengthsComponent;
  let fixture: ComponentFixture<TeacherReportStrengthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherReportStrengthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherReportStrengthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
