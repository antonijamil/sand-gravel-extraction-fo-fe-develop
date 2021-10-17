import { Injectable } from '@angular/core';
import {LoadingSite} from '@shared/model/loadingSite';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from "rxjs";
import {environment} from "@environment";

@Injectable({
  providedIn: 'root'
})
export class LoadingSitesService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get<LoadingSite[]>(this.baseURL + `/loading-sites`).pipe();
    return of([]);
  }
}
