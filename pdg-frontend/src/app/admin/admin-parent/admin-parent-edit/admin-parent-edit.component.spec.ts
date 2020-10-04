import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParentEditComponent } from './admin-parent-edit.component';

describe('AdminParentEditComponent', () => {
  let component: AdminParentEditComponent;
  let fixture: ComponentFixture<AdminParentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminParentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
