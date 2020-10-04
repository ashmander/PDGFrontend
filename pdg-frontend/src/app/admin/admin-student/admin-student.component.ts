import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/services/student.service';
import { ModalService } from 'src/app/services/modal.service';
import { GradeService } from 'src/app/services/grade.service';

@Component({
  selector: 'app-admin-student',
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css']
})
export class AdminStudentComponent implements OnInit {

  students: Student[] = [];
  studentSelected: Student;

  constructor(private studentService: StudentService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  showStrengths(student: Student): void {
    this.studentSelected = student;
    this.modalService.openModalStudentStrength();
  }

}
