import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Listinterface, UserDataInterface } from "./listinterface";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private url = 'https://reqres.in/';

  constructor(private httpClient : HttpClient) { }

  getdata(pageNo) : Observable <UserDataInterface> {
    return this.httpClient.get<UserDataInterface>(this.url + "api/users?page=" + pageNo)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  getEditData(pageNo) : Observable <UserDataInterface> {
    return this.httpClient.get<UserDataInterface>(this.url + "api/users/" + pageNo);
  }
  

 handleError() {
  let errorMessage = "Please connect to the internet.";
  alert(errorMessage);
  return throwError(errorMessage);
 }

  edit(post) {
    return this.httpClient.put(this.url + "api/users"  + post.id, {
      "FirstName": "Parth",
      "LastName": "Sardhara"
    });
  }

  delete(post): Observable<void> {
    return this.httpClient.delete<void>(this.url + "api/users"  + post.id);
  }

}