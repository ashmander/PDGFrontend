import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student';
import { Report } from '../model/report';
import { Parent } from '../model/parent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private urlEndpoint: string = URL_BACKEND+'/api/students';

  constructor(private http: HttpClient, private router: Router) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.urlEndpoint);
  }

  getStudent(id): Observable<Student> {
    return this.http.get<Student>(this.urlEndpoint+'/'+id);
  }

  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.urlEndpoint+"/reports", report);
  }

  createStudent(gradeId, schoolYearId, parent: Parent): Observable<Student> {
    return this.http.post<Student>(this.urlEndpoint+"/"+gradeId+"/"+schoolYearId, parent);
  }

  updateReport(report: Report): Observable<Report> {
    return this.http.put<Report>(this.urlEndpoint+"/reports", report);
  }
}
