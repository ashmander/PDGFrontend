import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_BACKEND } from '../config/config';
import { Grade } from '../model/grade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  urlEndpoint: string = URL_BACKEND+"/api/grades";

  constructor(private http: HttpClient) { }

  getGrade(gradeid): Observable<Grade> {
    return this.http.get<Grade>(this.urlEndpoint+"/"+gradeid)
  }

  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.urlEndpoint);
  }

  createGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.urlEndpoint, grade);
  }
}
