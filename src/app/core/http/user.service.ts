import { Injectable } from '@angular/core';
import {LoadingSite} from '@shared/model/loadingSite';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from "rxjs";
import {environment} from "@environment";
import {User} from "@shared/model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {
  }

  public getCurrentUser() {
    return this.http.get<User>(this.baseURL + `/current-user`).pipe(
      map( res => {
        return !res ? null : new User(res.id, res.name);
      }),
      catchError(err => of(null))
    );
  }
}
