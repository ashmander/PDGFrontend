import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-teacher-menu',
  templateUrl: './teacher-menu.component.html',
  styleUrls: ['./teacher-menu.component.css']
})
export class TeacherMenuComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.activatedRoute.params.subscribe(params => {
      let teacherid = params['teacherid'];
      let schoolyearid = params['schoolyearid'];
      this.courseService.getCoursesByTeacher(teacherid, schoolyearid).subscribe(courses => {
        this.courses = courses;
        console.log(this.courses)
      });
    })
  }

}
