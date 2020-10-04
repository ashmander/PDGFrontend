import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/model/course';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-teacher-course',
  templateUrl: './teacher-course.component.html',
  styleUrls: ['./teacher-course.component.css']
})
export class TeacherCourseComponent implements OnInit {

  course: Course = new Course();

  constructor(private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private studentService: StudentService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCourse();
  }

  loadCourse(): void {
    this.activatedRoute.params.subscribe(params => {
      let teacherid = params['teacherid'];
      let subjectid = params['subjectid'];
      let gradeid = params['gradeid'];
      let schoolyearid = params['schoolyearid'];
      if(teacherid && subjectid && gradeid) {
        this.courseService.getCourse(teacherid,subjectid,gradeid, schoolyearid).subscribe(course => {
          this.course = course;
          this.course.studentCourses.map(studentCourse => {
            this.studentService.getStudent(studentCourse.id.studentId).subscribe(student => studentCourse.student = student);
            return studentCourse;
          })
        });
      }
    })
  }

  showReports(): void {
    this.router.navigate(['teacher/'+this.course.id.teacherId+'/'+this.course.id.schoolYearId+'/reports',this.course.id.teacherId,this.course.id.gradeId,this.course.id.subjectId,this.course.id.schoolYearId])
  }

  verifyDay(): boolean {
    let day = this.getWeekDay(new Date().getDay());
    this.course.schedules.forEach( schedule => {
      if(schedule.day == day) {
        return true;
      }
    })
    return false;
  }

  getWeekDay(day: number): string {
    switch(day) {
      case 0: 
        return 'Domingo';
      case 1: 
        return 'Lunes';
      case 2: 
        return 'Martes';
      case 3: 
        return 'Miercoles';
      case 4: 
        return 'Jueves';
      case 5: 
        return 'Viernes';
      case 6: 
        return 'Sabado';
  
    }
  }

}
