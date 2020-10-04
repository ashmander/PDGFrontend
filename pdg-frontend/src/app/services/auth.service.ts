import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;
  private _schoolYearId: string;

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    let payload = this.getTokenData(this.token);
    if(payload!=null && payload.user_name && payload.user_name.length>0) {
      return true;
    } else {
      return false;
    }
  }

  public get schoolYearId(): string {
    if(this._schoolYearId != null) {
      return this._schoolYearId;
    } else if(this._schoolYearId == null && sessionStorage.getItem('syid')!=null) {
      this._schoolYearId = sessionStorage.getItem('syid');
      return this._schoolYearId;
    } else {
      return "";
    }
  }

  public get user(): User {
    if(this._user!=null) {
      return this._user;
    } else if(this._user == null && sessionStorage.getItem('user')!=null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    } else {
      return new User();
    }
  }

  public get token(): string {
    if(this._token != null) {
      return this._token;
    } else if(this._token == null && sessionStorage.getItem('token')!=null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    } else {
      return null;
    }
  }

  login(user: User): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token'
    const credentials = btoa('angularapp:12345');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                      'Authorization':'Basic '+credentials})
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.email);
    params.set('password', user.password);
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders})
  }

  saveToken(accesToken: string): void {
    this._token = accesToken;
    sessionStorage.setItem('token', this._token);
  }

  saveUser(accesToken: string): void {
    let payload = this.getTokenData(accesToken);
    this._user = new User();
    this._user.id = payload.id;
    this._user.email = payload.user_name;
    this._user.roles = payload.authorities;
    this._schoolYearId = payload.syid;
    sessionStorage.setItem('user', JSON.stringify(this._user));
    sessionStorage.setItem('syid', this._schoolYearId);
  }
  
  getTokenData(accesToken: string): any {
    if(accesToken != null) {
      return JSON.parse(atob(accesToken.split('.')[1]))
    }
  }

  logout(): void {
    this._token = null;
    this._user = null;
    this._schoolYearId = null;
    sessionStorage.clear();
  }

  hasRole(role: string): boolean {
    if(this.user.roles.includes(role)) {
      return true;
    }
    return false;
  }
}
