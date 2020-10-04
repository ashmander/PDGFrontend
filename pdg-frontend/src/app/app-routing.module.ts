import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { CreateStudentComponent } from './student/create-student/create-student.component';
import { CreateTeacherComponent } from './teacher/create-teacher/create-teacher.component';
import { AdminComponent } from './admin/admin.component';
import { AdminStudentComponent } from './admin/admin-student/admin-student.component';
import { AdminCourseComponent } from './admin/admin-course/admin-course.component';
import { AdminTeacherComponent } from './admin/admin-teacher/admin-teacher.component';
import { AdminParentComponent } from './admin/admin-parent/admin-parent.component';
import { AdminGradeComponent } from './admin/admin-grade/admin-grade.component';
import { AdminSchoolYearComponent } from './admin/admin-school-year/admin-school-year.component';
import { AdminSubjectComponent } from './admin/admin-subject/admin-subject.component';
import { ReportComponent } from './teacher/report/report.component';
import { TeacherCourseComponent } from './teacher/teacher-course/teacher-course.component';
import { ParentComponent } from './parent/parent.component';
import { TeacherReportsComponent } from './teacher/teacher-reports/teacher-reports.component';
import { ParentStudentComponent } from './parent/parent-student/parent-student.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch: 'full'},
  {path: 'teacher/:teacherid/:schoolyearid', component: TeacherComponent,
        children: [
          {path: 'course/:teacherid/:subjectid/:gradeid/:schoolyearid', component: TeacherCourseComponent},
          {path: 'reports/:teacherid/:gradeid/:subjectid/:schoolyearid', component: TeacherReportsComponent}
        ]},
  {path: 'parent/:parentid', component: ParentComponent,
        children: [
          {path: 'student/:studentid', component: ParentStudentComponent}
        ]},
  {path: 'admin/student/create', component: CreateStudentComponent},
  {path: 'teacher/:teacherid/:schoolyearid/course/:teacherid/:subjectid/:gradeid/:schoolyearid/report/:studentid/:reportid', component: ReportComponent},
  {path: 'admin/teacher/create/:teacherid', component: CreateTeacherComponent},
  {path: 'admin', component: AdminComponent,
        children: [
          {path: 'student', component: AdminStudentComponent},
          {path: ':schoolyearid/course', component: AdminCourseComponent},
          {path: 'teacher', component: AdminTeacherComponent},
          {path: 'parent', component: AdminParentComponent},
          {path: 'grade', component: AdminGradeComponent},
          {path: 'schoolyear', component: AdminSchoolYearComponent},
          {path: 'subject', component: AdminSubjectComponent},
        ] 
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
