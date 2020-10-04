import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSchoolYearComponent } from './admin-school-year.component';

describe('AdminSchoolYearComponent', () => {
  let component: AdminSchoolYearComponent;
  let fixture: ComponentFixture<AdminSchoolYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSchoolYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSchoolYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
