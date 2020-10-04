import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Strength } from '../model/strength';
import { HttpClient } from '@angular/common/http';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class StrengthService {

  private urlEndpoint: string = URL_BACKEND + "/api/strengths";

  constructor(private http: HttpClient) { }

  getStrengths(): Observable<Strength[]> {
    return this.http.get<Strength[]>(this.urlEndpoint);
  }
}
