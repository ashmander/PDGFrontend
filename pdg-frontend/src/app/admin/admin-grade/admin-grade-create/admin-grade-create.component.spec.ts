import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradeCreateComponent } from './admin-grade-create.component';

describe('AdminGradeCreateComponent', () => {
  let component: AdminGradeCreateComponent;
  let fixture: ComponentFixture<AdminGradeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGradeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGradeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
