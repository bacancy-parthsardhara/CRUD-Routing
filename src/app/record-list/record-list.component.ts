import { Component, OnInit } from '@angular/core';
import { CrudService } from "../crud.service";
import {  UserDataInterface } from "../listinterface";

@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {

  useri: UserDataInterface;

  array: any = [];

  pleaseWaitMessage: boolean = false;
  Displaytable: boolean = false;
  fetchData: boolean = false;

  constructor(private CrudService: CrudService) { }

  showDataPage(pageNo) {
    if (pageNo == null) {
      this.pleaseWaitMessage = true;
      this.CrudService.getdata(1).subscribe(response => {
        this.useri = response
        // console.log(this.useri);debugger
        for (let i = 0; i < this.useri.total_pages; i++) {
          this.array[i] = i + 1;
        }
        console.log(this.array);
        this.fetchData = false;
        this.pleaseWaitMessage = false;
        this.Displaytable = true;
      });
    }
    else {
      if (pageNo == this.useri.page) {
        this.fetchData = false;
      }
      else {
        this.useri.page = pageNo;
        this.fetchData = true;
        this.CrudService.getdata(pageNo).subscribe(response => {
          this.useri = response
          this.fetchData = false;
          this.Displaytable = true;
        });
      }
    }
  }


  delete(post){
    let errorMessage = "Are you sure you want to delete this user?";
    alert(errorMessage);
  }

  ngOnInit() {
    this.showDataPage(null);
  }
}