import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { RecordListComponent } from './record-list/record-list.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'record-list'
  },
  {
    path: 'record-list',
    component: RecordListComponent
  },
  // {
  //   path: 'record-list/new',
  //   component: AddRecordComponent
  // },
  
  {
    path: 'record-list/:id',
    component: AddRecordComponent
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
