import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { Observable } from 'rxjs';
import { Assignment } from '../model/assignment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private urlEndpoint: string = URL_BACKEND + "/api/assignments";

  constructor(private http: HttpClient) { }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.urlEndpoint);
  }
}
