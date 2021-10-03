import { Injectable } from '@angular/core';
import {LoadingSite} from '@shared/model/loadingSite';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Vessel} from '@shared/model/vessel';

@Injectable({
  providedIn: 'root'
})
export class VesselsService {
  baseURL = `http://localhost:8080`;

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get<Vessel[]>(this.baseURL + `/ships`).pipe(
      map(res => res['data'].map(ls => new Vessel(ls)))
    );
  }
}
