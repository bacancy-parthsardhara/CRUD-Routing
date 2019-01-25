import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CrudService } from "../crud.service";
import { UserDataInterface, Listinterface } from "../listinterface";

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  show: boolean = false;

  displayData: UserDataInterface;
  Submit: string = "Submit";
  id: string;

  constructor(private activatedRoute: ActivatedRoute, private CrudService: CrudService) {
    this.getUserData();
  }

  getUserData() {
    this.activatedRoute.params.subscribe((param) => {
      this.id = param['id'];
      if (this.id == "new") {
        this.show = true;
        this.displayData = null;
      }
      else {
        this.CrudService.getEditData(this.id).subscribe(response => {
          this.displayData = response;
        });
      }
    });
  }

  ngOnInit() { }

}
