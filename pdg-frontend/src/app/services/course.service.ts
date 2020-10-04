import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { URL_BACKEND } from '../config/config';
import { StudentCourse } from '../model/student-course';
import { StudentCourseKey } from '../model/student-course-key';
import { map } from 'rxjs/operators';
import { CourseKey } from '../model/course-key';
import { Report } from '../model/report';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  urlEndpoint: string = URL_BACKEND+"/api/courses";

  constructor(private http: HttpClient) { }

  getCourse(teacherid, subjectid, gradeid, schoolyearid): Observable<Course> {
    return this.http.get<Course>(`${this.urlEndpoint}/${teacherid}/${subjectid}/${gradeid}/${schoolyearid}`);
  }

  getCoursesByTeacher(teacherid, schoolyearid): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.urlEndpoint}/${teacherid}/${schoolyearid}`);
  }

  getStudentCourse(id: StudentCourseKey): Observable<StudentCourse> {
    return this.http.post<StudentCourse>(`${this.urlEndpoint}/studentcourses`,id);
  }

  getCourses(schoolyearid): Observable<Course[]> {
    return this.http.get<Course[]>(this.urlEndpoint+"/"+schoolyearid);
  }

  createCourse(course: Course): Observable<any> {
    return this.http.post<any>(this.urlEndpoint, course);
  }

  getReportsByCourse(courseKey: CourseKey): Observable<Report[]> {
    return this.http.post<Report[]>(this.urlEndpoint+"/reports",courseKey);
  }

  getReportByStudent(studentId, schoolYearId): Observable<Report[]> {
    return this.http.get<Report[]>(this.urlEndpoint+"/reports/"+studentId+"/"+schoolYearId)
  }

  getStudentsByCourse(courseKey: CourseKey): Observable<Student[]> {
    return this.http.post<Student[]>(this.urlEndpoint+"/students", courseKey);
  }

  getReportsByStudentCourse(studentCourse: StudentCourse): Observable<Report[]> {
    return this.http.post<Report[]>(this.urlEndpoint+"/reports/studentcourse", studentCourse);
  }

  updateCourse(course: Course): Observable<any> {
    return this.http.put<any>(this.urlEndpoint, course);
  }

  deleteCourse(gradeId, schoolYearId, subjectId, teacherId): Observable<any> {
    return this.http.delete<any>(this.urlEndpoint+"/"+subjectId+"/"+teacherId+"/"+gradeId+"/"+schoolYearId);
  }

  getReportById(reportId): Observable<Report> {
    return this.http.get<Report>(this.urlEndpoint+"/reports/"+reportId);
  }

  getReportsByCourseAndBetweenDate(courseKey: CourseKey, startDate: Date, endDate: Date): Observable<Report[]> {
    return this.http.post<Report[]>(this.urlEndpoint+"/reports/"+startDate+"/"+endDate, courseKey);
  }
}
