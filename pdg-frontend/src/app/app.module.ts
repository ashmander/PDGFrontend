import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ReportComponent } from './teacher/report/report.component';
import { StudentComponent } from './student/student.component';
import { CreateStudentComponent } from './student/create-student/create-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTeacherComponent } from './teacher/create-teacher/create-teacher.component';
import { AdminComponent } from './admin/admin.component';
import { CreateSubjectComponent } from './admin/create-subject/create-subject.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminStudentComponent } from './admin/admin-student/admin-student.component';
import { AdminTeacherComponent } from './admin/admin-teacher/admin-teacher.component';
import { AdminSubjectComponent } from './admin/admin-subject/admin-subject.component';
import { AdminParentComponent } from './admin/admin-parent/admin-parent.component';
import { AdminGradeComponent } from './admin/admin-grade/admin-grade.component';
import { AdminSchoolYearComponent } from './admin/admin-school-year/admin-school-year.component';
import { AdminCourseComponent } from './admin/admin-course/admin-course.component';
import { TeacherMenuComponent } from './teacher/teacher-menu/teacher-menu.component';
import { TeacherCourseComponent } from './teacher/teacher-course/teacher-course.component';
import { TeacherReportsComponent } from './teacher/teacher-reports/teacher-reports.component';
import { ParentComponent } from './parent/parent.component';
import { ParentMenuComponent } from './parent/parent-menu/parent-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CreateAssignmentComponent } from './teacher/create-assignment/create-assignment.component';
import { TeacherReportAssignmentsComponent } from './teacher/teacher-reports/teacher-report-assignments/teacher-report-assignments.component';
import { TeacherReportStrengthsComponent } from './teacher/teacher-reports/teacher-report-strengths/teacher-report-strengths.component';
import { AdminStudentStrengthComponent } from './admin/admin-student/admin-student-strength/admin-student-strength.component';
import { AdminSubjectCreateComponent } from './admin/admin-subject/admin-subject-create/admin-subject-create.component';
import { AdminGradeCreateComponent } from './admin/admin-grade/admin-grade-create/admin-grade-create.component';
import { AdminCourseCreateComponent } from './admin/admin-course/admin-course-create/admin-course-create.component';
import { ParentStudentComponent } from './parent/parent-student/parent-student.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ParentStudentAssignmentsComponent } from './parent/parent-student/parent-student-assignments/parent-student-assignments.component';
import { AdminParentEditComponent } from './admin/admin-parent/admin-parent-edit/admin-parent-edit.component';
import { AdminCourseSchedulesComponent } from './admin/admin-course/admin-course-schedules/admin-course-schedules.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeacherComponent,
    ReportComponent,
    StudentComponent,
    CreateStudentComponent,
    CreateTeacherComponent,
    AdminComponent,
    CreateSubjectComponent,
    AdminMenuComponent,
    AdminStudentComponent,
    AdminTeacherComponent,
    AdminSubjectComponent,
    AdminParentComponent,
    AdminGradeComponent,
    AdminSchoolYearComponent,
    AdminCourseComponent,
    TeacherMenuComponent,
    TeacherCourseComponent,
    TeacherReportsComponent,
    ParentComponent,
    ParentMenuComponent,
    CreateAssignmentComponent,
    TeacherReportAssignmentsComponent,
    TeacherReportStrengthsComponent,
    AdminStudentStrengthComponent,
    AdminSubjectCreateComponent,
    AdminGradeCreateComponent,
    AdminCourseCreateComponent,
    ParentStudentComponent,
    LoginComponent,
    ParentStudentAssignmentsComponent,
    AdminParentEditComponent,
    AdminCourseSchedulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
