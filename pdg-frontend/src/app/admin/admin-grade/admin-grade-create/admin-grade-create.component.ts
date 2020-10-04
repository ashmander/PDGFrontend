import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Grade } from 'src/app/model/grade';
import { ModalService } from 'src/app/services/modal.service';
import { GradeService } from 'src/app/services/grade.service';

@Component({
  selector: 'app-admin-grade-create',
  templateUrl: './admin-grade-create.component.html',
  styleUrls: ['./admin-grade-create.component.css']
})
export class AdminGradeCreateComponent implements OnInit {

  grade: Grade = new Grade();
  @Output()
  updateGrades = new EventEmitter();

  constructor(private gradeService: GradeService,
    public modalService: ModalService) { }

  ngOnInit(): void {
  }

  createGrade(): void {
    this.gradeService.createGrade(this.grade).subscribe(grade => {
      this.grade = grade;
      this.updateGrades.emit();
    })
    this.closeModal();
  }

  closeModal(): void {
    this.modalService.closeModalCreateGrade();
  }

}
