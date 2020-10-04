import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolYear } from '../model/school-year';

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

  private urlEndpoint: string =  URL_BACKEND+"/api/schoolyears";

  constructor(private http: HttpClient) { }

  getSchoolYears(): Observable<SchoolYear[]> {
    return this.http.get<SchoolYear[]>(this.urlEndpoint);
  }

  getSchoolYear(id): Observable<SchoolYear> {
    return this.http.get<SchoolYear>(this.urlEndpoint+"/"+id)
  }

  createSchoolYear(schoolYear): Observable<SchoolYear> {
    return this.http.post<SchoolYear>(this.urlEndpoint, schoolYear);
  }

  getSchoolYearByState(state: string): Observable<SchoolYear> {
    return this.http.get<SchoolYear>(this.urlEndpoint+"/state/"+state);
  }
}
