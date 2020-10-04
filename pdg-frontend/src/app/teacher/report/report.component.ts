import { Component, OnInit } from '@angular/core';
import { StudentCourse } from 'src/app/model/student-course';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from 'src/app/model/grade';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service';
import { Report } from 'src/app/model/report';
import { GradeService } from 'src/app/services/grade.service';
import { Strength } from 'src/app/model/strength';
import { StrengthService } from 'src/app/services/strength.service';
import { Assignment } from 'src/app/model/assignment';
import { Course } from 'src/app/model/course';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ReportAssignment } from 'src/app/model/report-assignment';
import { MatSelectChange } from '@angular/material/select';
import { StudentCourseKey } from 'src/app/model/student-course-key';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  studentCourse: StudentCourse = new StudentCourse();

  student: Student = new Student();
  report: Report = new Report();
  strengths: Strength[] = [];
  assignments: Assignment[] = [];
  course: Course = new Course();
  autocompleteControl = new FormControl();
  assignmentsName: string[] = ['One', 'Two', 'Three'];
  filteredAssignments: Observable<Assignment[]>;

  constructor(private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private courseService: CourseService,
    private strengthService: StrengthService,
    private modalService: ModalService,
    private router: Router) { }


  ngOnInit(): void {
    this.loadStudentCourse();
    this.filteredAssignments = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string'?value:value.name),
        map(value => value ? this._filter(value): [])
      );
  }

  loadStudentCourse(): void {
    this.activatedRoute.params.subscribe(params => {
      let gradeId = params['gradeid'];
      let studentId = params['studentid'];
      let subjectId = params['subjectid'];
      let teacherId = params['teacherid'];
      let schoolYearId = params['schoolyearid'];
      let reportId: string = params['reportid'];
      this.studentService.getStudent(studentId).subscribe(student => this.student = student);
      if(reportId != "undefined") {
        console.log(reportId)
        this.courseService.getReportById(reportId).subscribe(report => {
          this.report = report;
        })
      } else {
        let id = new StudentCourseKey();
        id.gradeId = gradeId;
        id.studentId = studentId;
        id.subjectId = subjectId;
        id.teacherId = teacherId;
        id.schoolYearId = schoolYearId;
        this.courseService.getStudentCourse(id).subscribe(studentCourse => {
          this.studentCourse = studentCourse;
          this.report.studentCourse = studentCourse;
        });
      }
      this.strengthService.getStrengths().subscribe(strengths => this.strengths = strengths);
      this.courseService.getCourse(teacherId, subjectId, gradeId, schoolYearId).subscribe(course => {
        this.course = course;
        this.assignments = course.assignments;
      });
    })
  }

  createReport(): void {
    console.log(this.report)
    this.studentService.createReport(this.report).subscribe(report => {
      this.router.navigate(['teacher/'+this.report.studentCourse.id.teacherId+'/'+this.report.studentCourse.id.schoolYearId+'/course/',this.report.studentCourse.id.teacherId,this.report.studentCourse.id.subjectId,this.report.studentCourse.id.gradeId,this.report.studentCourse.id.schoolYearId]);
    });
  }

  updateReport(): void {
    this.studentService.updateReport(this.report).subscribe(report => {
      this.router.navigate(['teacher/'+this.report.studentCourse.id.teacherId+'/'+this.report.studentCourse.id.schoolYearId+'/reports/',this.report.studentCourse.id.teacherId,this.report.studentCourse.id.gradeId,this.report.studentCourse.id.subjectId,this.report.studentCourse.id.schoolYearId])
    })
  }

  private _filter(value: string): Assignment[] {
    const filterValue = value.toLowerCase();

    return this.assignments.filter(assignment => assignment.name.toLowerCase().includes(filterValue));
  }

  showName(assignment?: Assignment): string | undefined {
    return assignment?assignment.name:undefined;
  }

  selectAssignment(event: MatAutocompleteSelectedEvent): void {
    let assignment = event.option.value as Assignment;
    if(this.existAssignment(assignment.id)==-1) {
      let newReportAssignment = new ReportAssignment();
      newReportAssignment.assignment = assignment;
      this.report.assignments.push(newReportAssignment);
    }
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  existAssignment(id: number): number {
    let exist = -1;
    this.report.assignments.forEach((reportAssignment: ReportAssignment, index) => {
      if(id === reportAssignment.assignment.id) {
        exist = index;
      }
    })
    return exist;
  }

  strengthSelected(event: MatSelectChange): void {
    let strength = event.value as Strength;
    if(this.existStrength(strength.id)==-1) {
      this.report.strengths.push(strength);
    }
  }

  existStrength(id: number): number {
    let exist = -1;
    this.report.strengths.forEach((strength: Strength, index) => {
      if(id === strength.id) {
        exist = index;
      }
    })
    return exist;
  }

  updateQualification(id: number, event: any): void {
    let qualification: string = event.target.value as string;
    this.report.assignments = this.report.assignments.map(assignment => {
      if(assignment.assignment.id == id) {
        assignment.qualification = qualification;
      }
      return assignment;
    })
  }

  updateDate(id: number, event: any): void {
    let date: Date = event.target.value as Date;
    this.report.assignments = this.report.assignments.map(assignment => {
      if(assignment.assignment.id == id) {
        assignment.assignmentDate = date;
      }
      return assignment;
    })
  }

  openModal(): void {
    this.modalService.openModalCreateAssignment();
  }

  updateCourse(course: Course) {
    this.course = course;
    this.assignments = this.course.assignments;
  }

  deleteAssignment(assignment: ReportAssignment): void {
    this.report.assignments = this.report.assignments.filter(reportAssignments => reportAssignments.assignment.id != assignment.assignment.id);
  }

  deleteStrength(strength: Strength): void {
    this.report.strengths = this.report.strengths.filter(strengthAux => strengthAux.id != strength.id)
  }
}
