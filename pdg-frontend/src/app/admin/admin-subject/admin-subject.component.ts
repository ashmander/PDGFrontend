import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { Subject } from 'src/app/model/subject';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.css']
})
export class AdminSubjectComponent implements OnInit {

  subjects: Subject[] = [];
  subjectSelected: Subject;

  constructor(private subjectService: SubjectService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(subjects => this.subjects = subjects);
  }

  updateSubjecs(): void {
    this.loadSubjects();
    this.subjectSelected = null;
  }

  createSubject(): void {
    this.subjectSelected = new Subject();
    this.modalService.openModalCreateSubject();
  }

  editSubject(subject): void {
    this.subjectSelected = subject;
    this.modalService.openModalCreateSubject();
  }

  deleteSubject(subjectId): void {
    this.subjectService.deleteSubject(subjectId).subscribe(response => {
      if(response.haveCourses != null) {
        Swal.fire("Error", response.haveCourses, "error");
      } else if(response.subjectNoExist != null) {
        Swal.fire("Error", response.subjectNoExist, "error")
      } else {
        this.loadSubjects();
      }
    });
  }
}
