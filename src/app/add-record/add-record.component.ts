import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CrudService } from "../crud.service";
import { Listinterface } from "../listinterface";

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  show: boolean = false;
  displayData: Listinterface;

  obj1 = {
    id: null,
    first_name: null,
    last_name: null,
    avatar: null
  }

  Submit: string = "Submit";
  id: string;

  constructor(private activatedRoute: ActivatedRoute, private CrudService: CrudService, private router: Router) {
    this.getUserData();
  }

  getUserData() {
    this.activatedRoute.params.subscribe((param) => {
      this.id = param['id'];
      if (this.id === "new") {
        this.Submit = "Submit";

        this.show = true;
        this.displayData = this.obj1;
      }
      else {
        this.displayData = {
          id: this.obj1.id,
          first_name: this.obj1.first_name,
          last_name: this.obj1.last_name,
          avatar: this.obj1.avatar,
        }
        this.CrudService.getEditData(this.id).subscribe((response: any) => {
          this.displayData = response.data;
          console.log(this.displayData);
          this.show = false;
        });
      }
    });
  }

  submit() {
    this.Submit = "please wait...";
    if (this.id == "new") {
      this.CrudService.creatPost(this.displayData).subscribe(r => { console.log("Inside creatPost method:::", r);
      this.router.navigateByUrl('/record-list');
     }
      );
    }
    else {
      this.CrudService.updatePut(this.displayData).subscribe(r => { console.log(r); 
      this.router.navigateByUrl('/record-list');
      });
    }
  }

  ngOnInit() { }

}

