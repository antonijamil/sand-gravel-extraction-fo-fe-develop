import { Injectable } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RegisterEntry} from '@shared/model/registerEntry';
import {map, catchError} from 'rxjs/operators';
import {DatePipe} from '@angular/common';
import {Observable, of} from 'rxjs';
import {Unloading} from '@shared/model/unloading';

@Injectable({
  providedIn: 'root'
})
export class RegisterEntriesService {
  baseURL = `http://localhost:8080`;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  public getRegisterEntriesByConcession(pageIndex: number, pageSize: number, sort: string, form: FormGroup) {
    // Set the parameters for the API call
    let parametres = new HttpParams();

    parametres = parametres.append('page', pageIndex.toString());
    parametres = parametres.append('page-size', pageSize.toString());
    parametres = parametres.append('sort', sort);

    if (form.controls['tripNumber'].value !== '') {
      parametres = parametres.append('tripNumber', form.controls['tripNumber'].value);
    }
    if (form.controls['vessel'].value !== '') {
      parametres = parametres.append('shipId', form.controls['vessel'].value);
    }
    if (form.controls['captain'].value !== '') {
      parametres = parametres.append('captainId', form.controls['captain'].value);
    }
    if (form.controls['date'].value !== '') {
      // simplifies the date format
      const searchStartDate = this.datepipe.transform(form.controls['date'].value[0], 'yyyy-MM-ddThh:mm:ss');
      let searchEndDate = this.datepipe.transform(form.controls['date'].value[0], 'yyyy-MM-ddThh:mm:ss');
      if (form.controls['date'].value[1]) {
        searchEndDate = this.datepipe.transform(form.controls['date'].value[1], 'yyyy-MM-ddThh:mm:ss');
      }
      parametres = parametres.append('startDateTime', searchStartDate);
      parametres = parametres.append('stopDateTime', searchEndDate);
    }

    if (form.controls['loadingSite'].value) {
      parametres = parametres.append('loadingSiteId', form.controls['loadingSite'].value);
    }

    // Get the data from the API Call
    return this.http.get<RegisterEntry[]>(
      this.baseURL + `/register-entries`,
      {params: parametres}
    ).pipe();
  }

  public getRegisterEntriesByCaptain(pageIndex: number, pageSize: number, sort: string, form: FormGroup) {
    // Set the parameters for the API call
    let parametres = new HttpParams();

    parametres = parametres.append('page', pageIndex.toString());
    parametres = parametres.append('page-size', pageSize.toString());
    parametres = parametres.append('sort', sort);

    if (form.controls['tripNumber'].value !== '') {
      parametres = parametres.append('tripNumber', form.controls['tripNumber'].value);
    }
    if (form.controls['vessel'].value !== '') {
      parametres = parametres.append('shipId', form.controls['vessel'].value);
    }
    if (form.controls['concessionCode'].value !== '') {
      parametres = parametres.append('concessionHolderNumber', form.controls['concessionCode'].value);
    }
    if (form.controls['date'].value !== '') {
      // simplifies the date format
      const searchStartDate = this.datepipe.transform(form.controls['date'].value[0], 'yyyy-MM-ddThh:mm:ss');
      let searchEndDate = this.datepipe.transform(form.controls['date'].value[0], 'yyyy-MM-ddThh:mm:ss');
      if (form.controls['date'].value[1]) {
        searchEndDate = this.datepipe.transform(form.controls['date'].value[1], 'yyyy-MM-ddThh:mm:ss');
      }
      parametres = parametres.append('startDateTime', searchStartDate);
      parametres = parametres.append('stopDateTime', searchEndDate);
    }
    if (form.controls['loadingSite'].value) {
      parametres = parametres.append('loadingSiteId', form.controls['loadingSite'].value);
    }
    if (form.controls['destination'].value) {
      parametres = parametres.append('destination', form.controls['destination'].value);
    }
    if (form.controls['destinationCountry'].value) {
      parametres = parametres.append('destinationCountry', form.controls['destinationCountry'].value);
    }

    // Get the data from the API Call
    return this.http.get<RegisterEntry[]>(
      this.baseURL + `/register-entries`,
      {params: parametres}
    ).pipe();
}

  public getById(id: number) {
    return this.http.get<RegisterEntry>(this.baseURL + `/register-entries/` + id).pipe(
      map( res => !res ? null : new RegisterEntry(res)),
      catchError(err => of(null))
    );
  }

  public add(re: RegisterEntry): Observable < boolean > {
    return this.http.post<RegisterEntry>(this.baseURL + `/register-entries`, re).pipe(
      map(res => true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
