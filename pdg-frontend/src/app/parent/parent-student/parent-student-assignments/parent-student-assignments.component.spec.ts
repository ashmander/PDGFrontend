import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentStudentAssignmentsComponent } from './parent-student-assignments.component';

describe('ParentStudentAssignmentsComponent', () => {
  let component: ParentStudentAssignmentsComponent;
  let fixture: ComponentFixture<ParentStudentAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentStudentAssignmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentStudentAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
