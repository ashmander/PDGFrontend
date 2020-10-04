import { Component, OnInit } from '@angular/core';
import { SchoolYear } from 'src/app/model/school-year';
import { SchoolYearService } from 'src/app/services/school-year.service';

@Component({
  selector: 'app-admin-school-year',
  templateUrl: './admin-school-year.component.html',
  styleUrls: ['./admin-school-year.component.css']
})
export class AdminSchoolYearComponent implements OnInit {

  schoolYears: SchoolYear[] = [];

  constructor(private schoolYearService: SchoolYearService) { }

  ngOnInit(): void {
    this.loadSchoolYears();
  }

  loadSchoolYears(): void {
    this.schoolYearService.getSchoolYears().subscribe(schoolYears => this.schoolYears = schoolYears);
  }

}
