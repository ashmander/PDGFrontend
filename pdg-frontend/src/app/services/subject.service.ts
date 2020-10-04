import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Subject } from '../model/subject';
import { HttpClient } from '@angular/common/http';
import { URL_BACKEND } from '../config/config';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private urlEndpoint = URL_BACKEND+"/api/subjects";

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.urlEndpoint);
  }

  getSubject(subjectId): Observable<Subject> {
    return this.http.get<Subject>(this.urlEndpoint+"/"+subjectId);
  }

  createSubject(subject: Subject): Observable<any> {
    return this.http.post<any>(this.urlEndpoint, subject).pipe(
      catchError(e => {
        Swal.fire("Error",e.error.error, "error");
        return throwError(e);
      })
    );
  }

  deleteSubject(subjectId): Observable<any> {
    return this.http.delete<any>(this.urlEndpoint+"/"+subjectId);
  }
}
