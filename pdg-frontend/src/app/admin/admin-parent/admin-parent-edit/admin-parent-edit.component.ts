import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ParentService } from 'src/app/services/parent.service';
import { Parent } from 'src/app/model/parent';

@Component({
  selector: 'app-admin-parent-edit',
  templateUrl: './admin-parent-edit.component.html',
  styleUrls: ['./admin-parent-edit.component.css']
})
export class AdminParentEditComponent implements OnInit {

  @Input() parent: Parent;
  @Output()
  parentUpdated = new EventEmitter()

  constructor(public modalService: ModalService,
    private parentService: ParentService) { }

  ngOnInit(): void {
  }

  updateParent(): void {
    console.log(this.parent);
    this.parentService.updateParent(this.parent).subscribe(parent => {
      this.parentUpdated.emit();
      this.closeModal();
    });
  }

  closeModal(): void {
    this.modalService.closeModalParentEdit();
  }

}
