import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Assignment } from 'src/app/model/assignment';
import { Course } from 'src/app/model/course';
import { CourseService } from 'src/app/services/course.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {

  assignment: Assignment = new Assignment();
  @Input() course: Course;
  @Output()
  updateCourse = new EventEmitter<Course>();

  constructor(private courseService: CourseService,
    public modalService: ModalService) { }

  ngOnInit(): void {
  }

  createAssignment(): void {
    this.course.assignments.push(this.assignment);
    this.courseService.createCourse(this.course).subscribe(course => {
      this.course = course;
      this.updateCourse.emit(this.course);
    });
    this.closeModal();
  }

  closeModal(): void {
    this.modalService.closeModalCreateAssignment();
  }

}
