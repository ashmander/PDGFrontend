import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Grade } from 'src/app/model/grade';
import { ModalService } from 'src/app/services/modal.service';
import { GradeService } from 'src/app/services/grade.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/model/subject';
import { Teacher } from 'src/app/model/teacher';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/model/course';
import { Schedule } from 'src/app/model/schedule';
import { Time } from '@angular/common';
import swal from 'sweetalert2';
import { SchoolYear } from 'src/app/model/school-year';
import { SchoolYearService } from 'src/app/services/school-year.service';

@Component({
  selector: 'app-admin-course-create',
  templateUrl: './admin-course-create.component.html',
  styleUrls: ['./admin-course-create.component.css']
})
export class AdminCourseCreateComponent implements OnInit {

  grade: Grade = new Grade();
  subject: Subject = new Subject();
  teacher: Teacher = new Teacher();
  @Input() course: Course;
  grades: Grade[] = [];
  subjects: Subject[] = [];
  teachers: Teacher[] = [];
  schedules: Schedule[] = [];
  schoolYear: SchoolYear;
  @Output()
  updateCourses = new EventEmitter();

  constructor(private gradeService: GradeService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    public modalService: ModalService,
    private schoolYearService: SchoolYearService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.teacherService.getTeachers().subscribe(teachers => this.teachers = teachers);
    this.gradeService.getGrades().subscribe(grades => this.grades = grades);
    this.subjectService.getSubjects().subscribe(subjects => this.subjects = subjects);
    this.schoolYearService.getSchoolYearByState("ACTIVE").subscribe(schoolYear => this.schoolYear = schoolYear);
    if(this.course.id != null) {
      this.schedules = this.course.schedules;
      for(let i = 0; i < this.schedules.length; i++) {
        this.schedules[i].pos=i;
      }
    }
  }

  createCourse(): void {
    if(this.verifySchedules(this.schedules) && this.schoolYear != null) {
      this.course.schedules = this.schedules;
      console.log(this.course);
      this.course.schoolYear = this.schoolYear;
      this.courseService.createCourse(this.course).subscribe(response => {
        this.handleResponse(response);
      })
    } else {
      swal.fire("Error","No puedes agendar dos veces a un profesor en el mismo dia a la misma franja horaria","error")
    }
  }

  deleteAssignment(pos: number): void {
    this.schedules = this.schedules.filter(schedule => schedule.pos!=pos);
    for(let i = 0; i < this.schedules.length; i++) {
      if(this.schedules[i].pos!=i) {
        this.schedules[i].pos = i;
      }
    }
  }

  closeModal(): void {
    this.course = null;
    this.schedules = [];
    this.modalService.closeModalCreateCourse();
    this.updateCourses.emit();
  }

  addSchedule(day: string): void {
    let schedule = new Schedule();
    schedule.day = day;
    schedule.pos = this.schedules.length;
    this.schedules.push(schedule);
  }

  updateStartTime(pos: number, event: any): void {
    let time =  event.target.value as string;
    time = time + ":00";
    this.schedules[pos].startTime = time;
  }

  updateEndTime(pos: number, event: any): void {
    let time = event.target.value as string;
    time = time + ":00";
    this.schedules[pos].endTime = time;
  }

  verifySchedules(schedules: Schedule[]): boolean {
    let verify = true;
    for(let i = 0; i < schedules.length && verify; i++) {
      for(let j = 0; j < schedules.length && verify; j++) {
        if(schedules[i].pos != schedules[j].pos && schedules[i].day == schedules[j].day) {
          let startTime1Hours = Number.parseInt(schedules[i].startTime.split(':')[0]);
          let startTime1Minutes = Number.parseInt(schedules[i].startTime.split(':')[1]);
          let endTime1Hours = Number.parseInt(schedules[i].endTime.split(':')[0]);
          let endTime1Minutes = Number.parseInt(schedules[i].endTime.split(':')[1]);
          let startTime2Hours = Number.parseInt(schedules[j].startTime.split(':')[0]);
          let startTime2Minutes = Number.parseInt(schedules[j].startTime.split(':')[1]);
          let endTime2Hours = Number.parseInt(schedules[j].endTime.split(':')[0]);
          let endTime2Minutes = Number.parseInt(schedules[j].endTime.split(':')[1]);
          if((startTime1Hours == startTime2Hours && startTime1Minutes >= startTime2Minutes && 
            startTime1Hours == endTime2Hours && startTime1Minutes < endTime2Minutes) ||
            (startTime1Hours > startTime2Hours && startTime1Hours < endTime2Hours) ||
            (startTime1Hours > startTime2Hours && startTime1Hours == endTime2Hours
              && startTime1Minutes < endTime2Minutes) ||
            (startTime1Hours == startTime2Hours && startTime1Hours < endTime2Hours
              && startTime1Minutes >= startTime2Minutes) ||  
            (endTime1Hours == endTime2Hours && endTime1Minutes <= endTime2Minutes && 
            endTime1Hours == startTime2Hours && endTime1Minutes > startTime2Minutes) ||
            (endTime1Hours > startTime2Hours && endTime1Hours < endTime2Hours) ||
            (endTime1Hours == startTime2Hours && endTime1Hours < endTime2Hours 
              && endTime1Minutes > startTime2Minutes) ||
            (endTime1Hours == endTime2Hours && endTime1Hours > startTime2Hours
              && endTime1Minutes <= endTime2Minutes)) {
              verify = false;
            }
        }
      }
    }
    return verify;
  }

  updateCourse(): void {
    if(this.verifySchedules(this.schedules)) {
      this.course.schedules = this.schedules;
      this.courseService.updateCourse(this.course).subscribe(response => {
        this.handleResponse(response);
      })
    } else {
      swal.fire("Error","No puedes agendar dos veces a un profesor en el mismo dia a la misma franja horaria","error")
    }
  }

  handleResponse(response): void {
    if(response.wrongTime != null) {
      swal.fire("Error", response.wrongTime, "error");
    } else if(response.scheduleConflict != null && response.courseConflict == null) {
      let scheduleAux = response.scheduleConflict as Schedule;
      swal.fire("Error", "El profesor "+this.course.teacher.name + " tiene conflicto con el dia "
      +scheduleAux.day+" a la hora de inicio "+scheduleAux.startTime+" y hora de fin "+scheduleAux.endTime)
    } else if(response.courseConflict != null) {
      let course = response.courseConflict as Course;
      let schedule = response.scheduleConflict as Schedule;
      swal.fire("Error", "Los estudiantes del grado "+course.grade.name+" estan viendo la materia "
      +course.subject.name+" el "+schedule.day+" de "+schedule.startTime+" a "+schedule.endTime, "error");
    } else {
      this.updateCourses.emit();
      this.course = new Course();
      this.schedules = [];
      this.closeModal();
    }
  }

  compareTeacher(o1: Teacher, o2: Teacher): boolean {
    if(o1 == undefined && o2 == undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false: o1.id == o2.id;
  }

  compareSubject(o1: Subject, o2: Subject): boolean {
    if(o1 == undefined && o2 == undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false: o1.id == o2.id;
  }

  compareGrade(o1: Grade, o2: Grade): boolean {
    if(o1 == undefined && o2 == undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false: o1.id == o2.id;
  }
}
