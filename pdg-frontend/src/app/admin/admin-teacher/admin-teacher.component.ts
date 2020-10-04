import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/model/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.css']
})
export class AdminTeacherComponent implements OnInit {

  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(teachers => this.teachers = teachers);
  }

  editTeacher(teacher: Teacher): void {
    this.router.navigate(['admin/teacher/create', teacher.id]);
  }

  deleteTeacher(teacherId): void {
    this.teacherService.deleteTeacher(teacherId).subscribe(response => {
      if(response.teacherNoExist != null) {
        Swal.fire("Error", response.teacherNoExist, "error");
      } else if(response.haveCourses != null) {
        Swal.fire("Error", response.haveCourses, "error");
      } else {
        this.loadTeachers();
      }
    });
  }

}
