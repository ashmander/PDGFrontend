import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Schedule } from 'src/app/model/schedule';

@Component({
  selector: 'app-admin-course-schedules',
  templateUrl: './admin-course-schedules.component.html',
  styleUrls: ['./admin-course-schedules.component.css']
})
export class AdminCourseSchedulesComponent implements OnInit {

  @Input() schedules: Schedule[];

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {

  }

  closeModal(): void {
    this.schedules = [];
    this.modalService.closeModalCourseSchedule();
  }

}
