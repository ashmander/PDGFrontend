import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { Subject } from '../model/subject';
import { Course } from '../model/course';
import { Teacher } from '../model/teacher';
import { Grade } from '../model/grade';
import { SchoolYear } from '../model/school-year';
import { Parent } from '../model/parent';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public students: Student[]=[];
  public subjects: Subject[]=[];
  public courses: Course[]=[];
  public teachers: Teacher[]=[];
  public grades: Grade[]=[];
  public schoolYears: SchoolYear[]=[];
  public parents: Parent[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
