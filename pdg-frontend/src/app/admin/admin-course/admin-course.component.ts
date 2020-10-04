import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course';
import { CourseService } from 'src/app/services/course.service';
import { ModalService } from 'src/app/services/modal.service';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from 'src/app/model/schedule';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.css']
})
export class AdminCourseComponent implements OnInit {

  courses: Course[] = [];
  schedulesSelected: Schedule[];
  courseSelected: Course;

  constructor(private courseService: CourseService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.activatedRoute.params.subscribe(params => {
      let schoolYearId = params['schoolyearid']
      this.courseService.getCourses(schoolYearId).subscribe(courses => this.courses = courses);
    })
  }

  uploadCourses(): void {
    this.courseSelected = null;
    this.loadCourses();
  }

  createCourse(): void{
    this.courseSelected = new Course();
    this.modalService.openModalCreateCourse();
  }

  editCourse(course: Course): void {
    this.courseSelected = course;
    this.modalService.openModalCreateCourse();
  }

  showSchedule(schedules: Schedule[]): void {
    this.schedulesSelected = schedules;
    this.modalService.openModalCourseSchedule();
  }

  deleteCourse(course: Course): void {
    this.courseService.deleteCourse(course.id.gradeId, course.id.schoolYearId, course.id.subjectId, course.id.teacherId)
    .subscribe(response => {
      if(response.courseNoExist != null) {
        Swal.fire("Error",response.courseNoExist,"error");
      } else if(response.reportsOrControls != null) {
        Swal.fire("Error",response.reportsOrControls, "error");
      } else {
        this.loadCourses();
      }
    });
  }
}
