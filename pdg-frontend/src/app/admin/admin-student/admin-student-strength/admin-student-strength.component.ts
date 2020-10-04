import { Component, OnInit, Input } from '@angular/core';
import { StudentStrength } from 'src/app/model/student-strength';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-admin-student-strength',
  templateUrl: './admin-student-strength.component.html',
  styleUrls: ['./admin-student-strength.component.css']
})
export class AdminStudentStrengthComponent implements OnInit {

  @Input() strengths: StudentStrength[] = [];

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.modalService.closeModalStudentStrength();
  }

}
