import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseSchedulesComponent } from './admin-course-schedules.component';

describe('AdminCourseSchedulesComponent', () => {
  let component: AdminCourseSchedulesComponent;
  let fixture: ComponentFixture<AdminCourseSchedulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCourseSchedulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCourseSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
