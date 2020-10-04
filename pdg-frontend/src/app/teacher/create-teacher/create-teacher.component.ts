import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/model/teacher';
import { Router, ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit {

  public teacher: Teacher = new Teacher();

  constructor(private router: Router,
    private teacherService: TeacherService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      let teacherId = params["teacherid"];
      if(teacherId != -1) {
        this.teacherService.getTeacher(teacherId).subscribe(teacher => this.teacher = teacher);
      }
    })
  }

  createTeacher(): void {
    this.teacherService.createTeacher(this.teacher).subscribe(teacher => {
      this.router.navigate(['admin/teacher']);
    });
  }

  updateTeacher(): void {
    console.log(this.teacher);
    this.teacherService.updateTeacher(this.teacher).subscribe(teacher => this.router.navigate(['admin/teacher']));
  }

}
