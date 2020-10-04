import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Strength } from 'src/app/model/strength';

@Component({
  selector: 'app-teacher-report-strengths',
  templateUrl: './teacher-report-strengths.component.html',
  styleUrls: ['./teacher-report-strengths.component.css']
})
export class TeacherReportStrengthsComponent implements OnInit {

  @Input() strengths: Strength[] = [];

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.modalService.closeModalTeacherReportStrengths();
  }

}
