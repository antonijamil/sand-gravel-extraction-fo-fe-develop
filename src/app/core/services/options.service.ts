import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private statusSubject = new ReplaySubject(1);
  private statusObservable$ = this.statusSubject.asObservable();

  constructor(private translateService: TranslateService) {
    this.init();

    this.translateService.onLangChange.subscribe(() => {
      this.init();
    });
  }

  public getStatuses(): Observable<any> {
    return this.statusObservable$;
  }

  private init(): void {
    this.initStatutes();
  }

  private initStatutes() {
    this.statusSubject.next([
      {label: this.translateService.instant('enum.statuses.PROCESSED'), value: 'PROCESSED'},
      {label: this.translateService.instant('enum.statuses.ACTION_REQUIRED'), value: 'ACTION_REQUIRED'},
      {label: this.translateService.instant('enum.statuses.SOLVED'), value: 'SOLVED'}]);
  }
}
