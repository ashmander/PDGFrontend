import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { StudentCourse } from 'src/app/model/student-course';
import { ReportAssignment } from 'src/app/model/report-assignment';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-parent-student-assignments',
  templateUrl: './parent-student-assignments.component.html',
  styleUrls: ['./parent-student-assignments.component.css']
})
export class ParentStudentAssignmentsComponent implements OnInit {

  @Input() studentCourse: StudentCourse;

  reportAssignments: ReportAssignment[] = [];

  constructor(private courseService: CourseService,
    public modalService: ModalService) { }

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    this.courseService.getReportsByStudentCourse(this.studentCourse).subscribe(reports => {
      reports.forEach(report => {
        report.assignments.forEach(assignment => {
          this.reportAssignments.push(assignment);
        })
      })
    });
  }

  closeModal(): void {
    this.modalService.closeModalParentAssignments();
    this.reportAssignments = [];
  }

}
