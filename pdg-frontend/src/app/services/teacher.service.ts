import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Teacher } from '../model/teacher';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private urlEndpoint: string = URL_BACKEND+'/api/teachers';

  constructor(private http: HttpClient, private router: Router) { }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.urlEndpoint);
  }

  getTeacher(id): Observable<Teacher> {
    return this.http.get<Teacher>(this.urlEndpoint+"/"+id);
  }

  createTeacher(teacher: Teacher): Observable<any> {
    return this.http.post<any>(this.urlEndpoint, teacher).pipe(
      catchError( err => {
        Swal.fire("Error", err.error.error, "error");
        return throwError(err);
      })
    );
  }

  updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(this.urlEndpoint,teacher);
  }

  deleteTeacher(teacherId): Observable<any> {
    return this.http.delete<any>(this.urlEndpoint+"/"+teacherId);
  }
}
