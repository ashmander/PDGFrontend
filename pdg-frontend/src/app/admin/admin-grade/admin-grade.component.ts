import { Component, OnInit } from '@angular/core';
import { Grade } from 'src/app/model/grade';
import { GradeService } from 'src/app/services/grade.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-admin-grade',
  templateUrl: './admin-grade.component.html',
  styleUrls: ['./admin-grade.component.css']
})
export class AdminGradeComponent implements OnInit {

  grades: Grade[] = [];

  constructor(private gradeService: GradeService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.gradeService.getGrades().subscribe(grades => this.grades = grades);
  }

  updateGrades(): void {
    this.loadGrades();
  }

  createGrade(): void {
    this.modalService.openModalCreateGrade();
  }

}
