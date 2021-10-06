import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Vessel} from '@shared/model/vessel';
import {map} from 'rxjs/operators';
import {ConcessionHolder} from '@shared/model/concessionHolder';
import {observable} from "rxjs";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcessionHoldersService {
  baseURL = `http://localhost:8080`;

  constructor(private http: HttpClient) { }

  public getAll() {
    /*return this.http.get<ConcessionHolder[]>(this.baseURL + `/concession-holders`).pipe(
      map(res => res['data'].map(ch => new ConcessionHolder(ch)))
    );*/
    return of([]);
  }
}
