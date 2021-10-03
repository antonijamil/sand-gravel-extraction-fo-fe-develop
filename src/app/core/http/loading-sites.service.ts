import { Injectable } from '@angular/core';
import {LoadingSite} from '@shared/model/loadingSite';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadingSitesService {
  baseURL = `http://localhost:8080`;

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get<LoadingSite[]>(this.baseURL + `/loading-sites`).pipe();
  }
}
