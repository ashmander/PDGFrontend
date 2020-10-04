import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parent } from '../model/parent';
import { URL_BACKEND } from '../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  private urlEndpoint = URL_BACKEND + "/api/parents";

  constructor(private http: HttpClient) { }

  getParent(parentid): Observable<Parent> {
    return this.http.get<Parent>(this.urlEndpoint+"/"+parentid);
  }

  getParents(): Observable<Parent[]> {
    return this.http.get<Parent[]>(this.urlEndpoint);
  }

  createParent(parent: Parent): Observable<Parent> {
    return this.http.post<Parent>(this.urlEndpoint, parent);
  }

  updateParent(parent: Parent): Observable<Parent> {
    return this.http.put<Parent>(this.urlEndpoint, parent);
  }

  deleteParent(parentId): Observable<any> {
    return this.http.delete<any>(this.urlEndpoint+"/"+parentId);
  }
}
