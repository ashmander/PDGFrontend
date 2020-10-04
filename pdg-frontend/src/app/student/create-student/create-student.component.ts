import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { Parent } from 'src/app/model/parent';
import { Grade } from 'src/app/model/grade';
import { AutonomyLevel } from 'src/app/model/autonomy-level';
import { StudentService } from 'src/app/services/student.service';
import { ParentService } from 'src/app/services/parent.service';
import { GradeService } from 'src/app/services/grade.service';
import { Router } from '@angular/router';
import { SchoolYearService } from 'src/app/services/school-year.service';
import { SchoolYear } from 'src/app/model/school-year';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  public student: Student = new Student();
  public parent: Parent = new Parent();
  public parents: Parent[]=[];
  public grades: Grade[]=[];
  public autonomyLevels: AutonomyLevel[]=[];
  public grade: Grade = new Grade();
  private schoolYear: SchoolYear;

  constructor(private studentService: StudentService,
    private parentService: ParentService,
    private gradeService: GradeService,
    private router: Router,
    private schoolYearService: SchoolYearService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.gradeService.getGrades().subscribe(grades => this.grades = grades);
    this.parentService.getParents().subscribe(parents => this.parents = parents);
    this.schoolYearService.getSchoolYearByState('ACTIVE').subscribe(schoolYear => this.schoolYear = schoolYear);
  }

  createStudent(): void {
    this.parent.students.push(this.student);
    this.studentService.createStudent(this.student.grade.id, this.schoolYear.id, this.parent).subscribe((student) => {
      console.log(student);
      return this.router.navigate(['/admin/student']);
    });
  }
}
