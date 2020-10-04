import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';
import { GradeService } from 'src/app/services/grade.service';
import { Grade } from 'src/app/model/grade';
import { ModalService } from 'src/app/services/modal.service';
import { StudentCourse } from 'src/app/model/student-course';

@Component({
  selector: 'app-parent-student',
  templateUrl: './parent-student.component.html',
  styleUrls: ['./parent-student.component.css']
})
export class ParentStudentComponent implements OnInit {

  student: Student = new Student();
  grade: Grade = new Grade();
  studentCourse: StudentCourse;

  constructor(private studentService: StudentService,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService,
    private gradeService: GradeService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['studentid']
      this.studentService.getStudent(id).subscribe(student =>  {
        this.student = student;
        console.log(student)
        if(this.student.courses.length>0) {
          this.student.courses.map(course => {
            this.subjectService.getSubject(course.id.subjectId).subscribe(subject =>  course.subject = subject)
          })
          this.gradeService.getGrade(student.courses[0].id.gradeId).subscribe(grade => this.grade = grade)
        }
      });
    })
  }

  showAssignments(studentCourse: StudentCourse): void {
    this.studentCourse = studentCourse;
    this.modalService.openModalParentAssignments();
  }
}
