import { Component, OnInit } from '@angular/core';
import { SchoolYear } from 'src/app/model/school-year';
import { SchoolYearService } from 'src/app/services/school-year.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  element: string;
  schoolYear: SchoolYear = new SchoolYear();

  constructor(private schoolYearService: SchoolYearService) { }

  ngOnInit(): void {
    this.schoolYearService.getSchoolYearByState("ACTIVE").subscribe(schoolYear => this.schoolYear = schoolYear);    
  }

}
