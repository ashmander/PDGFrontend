import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'src/app/model/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { ModalService } from 'src/app/services/modal.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-subject-create',
  templateUrl: './admin-subject-create.component.html',
  styleUrls: ['./admin-subject-create.component.css']
})
export class AdminSubjectCreateComponent implements OnInit {

  @Input() subject: Subject;
  @Output()
  updateSubjects = new EventEmitter();

  constructor(private subjectService: SubjectService,
    public modalService: ModalService) { }

  ngOnInit(): void {
  }

  createSubject(): void {
    this.subjectService.createSubject(this.subject).subscribe(response => {
        this.subject = response.subject;
        this.updateSubjects.emit();
        this.subject = new Subject();
        this.closeModal();
    })
  }

  closeModal(): void {
    this.modalService.closeModalCreateSubject();
  }


}
