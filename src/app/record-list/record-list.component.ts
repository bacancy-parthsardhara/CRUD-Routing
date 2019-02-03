import { Component, OnInit } from '@angular/core';
import { CrudService } from "../crud.service";
import { UserDataInterface } from "../listinterface";


@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {

  useri: UserDataInterface;
  array: any = [];

  // pleaseWaitMessage: boolean = false;
  fetchData: boolean = false;
  // Displaytable: boolean = false;

  firstMessage: string = " Please wait while we are getting user details...";

  constructor(private CrudService: CrudService) { }

  showDataPage(pageNo) {
    if (pageNo == null) {
      // this.pleaseWaitMessage = false;
      this.CrudService.getdata(1).subscribe(response => {
        this.useri = response
        for (let i = 0; i < this.useri.total_pages; i++) {
          this.array[i] = i + 1;
        }
        // console.log(this.array);
        this.fetchData = false;
        // this.pleaseWaitMessage = true;
        // this.Displaytable = true;
      }, () => {
        this.firstMessage = "Please check your connection..."
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
          // this.pleaseWaitMessage = true;
        });
      }
    }
  }

  
  delete(post): void {
    console.log("post", post);
    this.CrudService.delete(post).subscribe(() => {
      let index = this.useri.data.indexOf(post);
      console.log(index);
      if (confirm("Are you sure you want to delete this user ?"))
        this.useri.data.splice(index, 1);
    });
  }

  ngOnInit() {
    this.showDataPage(null);
  }
}
