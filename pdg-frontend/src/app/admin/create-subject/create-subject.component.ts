import { Component, OnInit } from '@angular/core';
import { CreateSubjectService } from './create-subject.service';
import { Subject } from '../../model/subject';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  public subject: Subject = new Subject();

  constructor(public createSubjectService: CreateSubjectService) { }

  ngOnInit(): void {
  }

}
