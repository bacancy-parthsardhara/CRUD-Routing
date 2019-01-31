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

  constructor(private httpClient: HttpClient) { }

  getdata(pageNo): Observable<UserDataInterface> {
    return this.httpClient.get<UserDataInterface>(this.url + "api/users?page=" + pageNo)
      .pipe(
        catchError(this.handleError)
      );
  }
  getEditData(id): Observable<Listinterface> {
    return this.httpClient.get<Listinterface>(this.url + "api/users/" + id);
  }


  handleError(error)
 {
    return throwError(error);
  }

  edit(post) {
    return this.httpClient.put(this.url + "api/users" + post.id, {
      "FirstName": "Parth",
      "LastName": "Sardhara"
    });
  }

  delete(post): Observable<void> {
    return this.httpClient.delete<void>(this.url + "api/users" + post.id);
  }

  creatPost(obj): Observable<UserDataInterface> {
    return this.httpClient.post<UserDataInterface>(this.url + "api/users", obj);
  }
  updatePut(obj): Observable<UserDataInterface> {
    return this.httpClient.put<UserDataInterface>(this.url + "api/users", obj);
  }
}