import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {
  }

  public getAll() {
    return this.http.get('../../../assets/country/country.json').pipe(
      map(res => res['data'].map(c => c)));
    return of([]);
  }
}
