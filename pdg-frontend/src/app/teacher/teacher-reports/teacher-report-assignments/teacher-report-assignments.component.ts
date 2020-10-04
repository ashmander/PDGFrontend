import { Component, OnInit, Input } from '@angular/core';
import { ReportAssignment } from 'src/app/model/report-assignment';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-teacher-report-assignments',
  templateUrl: './teacher-report-assignments.component.html',
  styleUrls: ['./teacher-report-assignments.component.css']
})
export class TeacherReportAssignmentsComponent implements OnInit {

  @Input() reportAssignments: ReportAssignment[] = [];

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(): void {
    this.modalService.closeModalTeacherReportAssignments();
  }

}
