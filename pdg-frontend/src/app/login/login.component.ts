import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SchoolYear } from '../model/school-year';
import { SchoolYearService } from '../services/school-year.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private authService: AuthService,
    private router: Router) {
    this.user = new User();
   }

  ngOnInit(): void {
    if(this.authService.isAuthenticated) {
      let user = this.authService.user;
      let schoolYearId = this.authService.schoolYearId;
      this.navegate(user.roles, user.id, schoolYearId);
    }
  }

  login(): void {
    this.authService.login(this.user).subscribe(response => {
      this.authService.saveToken(response.access_token);
      this.authService.saveUser(response.access_token);
      let user = this.authService.user;
      let schoolYearId = this.authService.schoolYearId;
      this.navegate(user.roles, user.id, schoolYearId);
    });
  }

  navegate(roles: string[], id, schoolYearId): void {
    roles.forEach(role => {
      if(role == 'ROLE_ADMIN') {
        this.router.navigate(['admin']);
      } else if(role == 'ROLE_TEACHER') {
        this.router.navigate(['teacher',id,schoolYearId]);
      } else if(role == 'ROLE_PARENT') {
        this.router.navigate(['parent',id])
      }
    })
  }
}
