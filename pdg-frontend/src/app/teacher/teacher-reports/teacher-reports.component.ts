import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/model/report';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseKey } from 'src/app/model/course-key';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { StudentService } from 'src/app/services/student.service';
import { ReportAssignment } from 'src/app/model/report-assignment';
import { ModalService } from 'src/app/services/modal.service';
import { Strength } from 'src/app/model/strength';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Student } from 'src/app/model/student';
import { map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-teacher-reports',
  templateUrl: './teacher-reports.component.html',
  styleUrls: ['./teacher-reports.component.css']
})
export class TeacherReportsComponent implements OnInit {

  reports: Report[] = [];
  subject: Subject;
  assignmentsSelected: ReportAssignment[] = [];
  strengthsSelected: Strength[] = [];
  autocompleteControl = new FormControl();
  studentsName: string[] = [];
  filteredStudents: Observable<Student[]>;
  sutdents: Student[]=[];
  startDate: Date;
  endDate: Date;
  courseKey: CourseKey;

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private modalService: ModalService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadReports();
    this.filteredStudents = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string'?value:value.name),
        map(value => value ? this._filter(value): [])
      );
  }

  loadReports(): void {
    this.activatedRoute.params.subscribe(params => {
      let gradeId = params['gradeid'];
      let teacherId = params['teacherid'];
      let subjectId = params['subjectid'];
      let schoolYearId = params['schoolyearid'];
      let courseKey = new CourseKey();
      courseKey.gradeId = gradeId;
      courseKey.teacherId = teacherId;
      courseKey.subjectId = subjectId;
      courseKey.schoolYearId = schoolYearId;
      this.courseKey = courseKey;
      this.courseService.getStudentsByCourse(courseKey).subscribe(students => this.sutdents = students);
      this.subjectService.getSubject(subjectId).subscribe(subject => this.subject = subject);
      this.courseService.getReportsByCourse(courseKey).subscribe(reports => {
        this.reports = reports
        this.reports.map(report => {
          this.studentService.getStudent(report.studentCourse.id.studentId).subscribe(student => {
            report.student=student;
          })
        })
      })
    })
  }

  showAssignments(report: Report): void {
    this.assignmentsSelected = report.assignments;
    this.modalService.openModalTeacherReportAssignments();
  }

  showStrengths(report: Report): void {
    this.strengthsSelected = report.strengths;
    this.modalService.openModalTeacherReportStrengths()
  }

  private _filter(value: string): Student[] {
    const filterValue = value.toLowerCase();
    return this.sutdents.filter(student => student.name.toLowerCase().includes(filterValue));
  }

  showName(student?: Student): string | undefined {
    return student?student.name:undefined;
  }

  selectStudent(event: MatAutocompleteSelectedEvent): void {
    let student = event.option.value as Student;
    this.courseService.getReportByStudent(student.id, this.courseKey.schoolYearId).subscribe(reports => {
      this.reports = reports;
      this.reports.map(report => {
        this.studentService.getStudent(report.studentCourse.id.studentId).subscribe(student => report.student=student)
      })
    });
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  editReport(report: Report) {
    this.router.navigate(['teacher/'+report.studentCourse.id.teacherId+'/'+report.studentCourse.id.schoolYearId+'/course/'+report.studentCourse.id.teacherId+'/'+report.studentCourse.id.subjectId+'/'+report.studentCourse.id.gradeId+'/'+report.studentCourse.id.schoolYearId+'/report/',report.studentCourse.id.studentId,report.id]);
  }

  search(): void {
    this.courseService.getReportsByCourseAndBetweenDate(this.courseKey, this.startDate, this.endDate).subscribe(reports => {
      console.log(reports);
      this.reports = reports;
      this.reports.map(report => {
        this.studentService.getStudent(report.studentCourse.id.studentId).subscribe(student => report.student=student)
      })
    })
  }

}
