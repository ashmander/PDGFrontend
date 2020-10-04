import { Component, OnInit } from '@angular/core';
import { Parent } from 'src/app/model/parent';
import { ParentService } from 'src/app/services/parent.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parent-menu',
  templateUrl: './parent-menu.component.html',
  styleUrls: ['./parent-menu.component.css']
})
export class ParentMenuComponent implements OnInit {

  parent: Parent = new Parent();

  constructor(private parentService: ParentService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadParent();
  }

  loadParent(): void {
    this.activatedRoute.params.subscribe(params => {
      let parentId = params['parentid'];
      console.log(parentId);
      this.parentService.getParent(parentId).subscribe(parent => this.parent = parent)
    })
  }

}
