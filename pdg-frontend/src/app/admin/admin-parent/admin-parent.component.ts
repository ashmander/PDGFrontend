import { Component, OnInit } from '@angular/core';
import { Parent } from 'src/app/model/parent';
import { ParentService } from 'src/app/services/parent.service';
import { ModalService } from 'src/app/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-parent',
  templateUrl: './admin-parent.component.html',
  styleUrls: ['./admin-parent.component.css']
})
export class AdminParentComponent implements OnInit {

  parents: Parent[] = [];
  parentSelected: Parent;

  constructor(private parentService: ParentService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.loadParents();
  }

  loadParents(): void {
    this.parentService.getParents().subscribe(parents => this.parents = parents);
  }

  updateParents(): void {
    this.loadParents();
  }

  editParent(parent: Parent): void {
    this.parentSelected = parent;
    this.modalService.openModalParentEdit();
  }

  deleteParent(parentId): void {
    this.parentService.deleteParent(parentId).subscribe(response => {
      if(response.parentNoExist != null) {
        Swal.fire("Error", response.parentNoExist, "error");
      } else if(response.haveStudents != null) {
        Swal.fire("Error", response.haveStudents, "error");
      } else {
        this.loadParents();
      }
    });
  }
}
