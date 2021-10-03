import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterEntry} from '../../../../shared/model/registerEntry';
import {LazyLoadEvent} from 'primeng';
import {RegisterEntriesService} from '@core/http/register-entries.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LoadingSitesService} from '@core/http/loading-sites.service';
import {CountriesService} from '@core/services/countries.service';
import {faBook, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {appRoutesLinks} from '@app/app.routes.links';

@Component({
  selector: 'app-list-view-concession',
  templateUrl: './list-view-concession.component.html',
  styleUrls: ['./list-view-concession.component.css']
})
export class ListViewConcessionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translateService: TranslateService,
    private loadingSiteService: LoadingSitesService,
    private registerEntriesService: RegisterEntriesService,
    ) { }
  faBook = faBook;
  faSearch = faSearch;
  faTimesCircle = faTimesCircle;

  loading: boolean;

  // Variables to initiate the groupForm
  searchForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  minYear: number;
  maxYear: number;
  yearRange: string;
  loadingSitesOptions: any[];
  registersList: RegisterEntry[];

  // Variables to indicate if the field is empty
  filledtripNumber: boolean;
  filledVessel: boolean;
  filledCaptain: boolean;
  filledDate: boolean;
  filledLoadingSite: boolean;

  pageIndex: number;
  pageSize: number;
  sort: string;
  totalRecords: number;

  ngOnInit(): void {
    this.pageIndex = 0;
    this.pageSize = 10;
    this.sort = 'tripNumber';
    this.totalRecords = 0;

    this.searchForm = this.fb.group({
      tripNumber: [''],
      vessel: [''],
      captain: [''],
      date: [''],
      loadingSite: [''],
    });

    this.loading = true;

    // Information about the field Date
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 10);
    this.maxDate = new Date();
    this.maxYear = this.maxDate.getFullYear();
    this.minYear = this.maxYear - 10;
    this.yearRange = this.minYear + ':' + this.maxYear;

    /*this.loadingSitesOptions = [
      {label: '', value : ''},
      {label: 'Kwintebank', value : 'Kwintebank'},
      {label: 'Oosthinder', value : 'Oosthinder'},
      {label: 'Thorntonbank', value : 'Thorntonbank'},
      {label: 'Buiten Ratel', value : 'Buiten Ratel'}
    ];*/

    // Change the format of loadingSite's attributes
    this.loadingSitesOptions = [];
    console.log(this.loadingSitesOptions);
    this.loadingSiteService.getAll().subscribe(loadingSites => {
        loadingSites.forEach( res => this.loadingSitesOptions.push({label: res.name, value: res.id}));
      }
    );
    this.registersList = [];
    this.loading = false;
  }

  // Function to manage the clear button of each search field
  cleartripNumber(): void {
    this.searchForm.controls['tripNumber'].setValue('');
    this.filledtripNumber = false;
    this.checkPristine();
  }

  clearVessel(): void {
    this.searchForm.controls['vessel'].setValue('');
    this.filledVessel = false;
    this.checkPristine();
  }

  clearCaptain(): void {
    this.searchForm.controls['captain'].setValue('');
    this.filledCaptain = false;
    this.checkPristine();
  }

  clearDate(): void {
    this.searchForm.controls['date'].setValue('');
    this.filledDate = false;
    this.checkPristine();
  }

  clearLoadingSite(): void {
    this.searchForm.controls['loadingSite'].setValue('');
    this.filledLoadingSite = false;
    this.checkPristine();
  }

  checkPristine(): void {
    if (this.searchForm.controls['tripNumber'].value === '' && this.searchForm.controls['vessel'].value === '' && this.searchForm.controls['captain'].value === '' && this.searchForm.controls['date'].value === '' && this.searchForm.controls['loadingSite'].value === '' ) {
      this.searchForm = this.fb.group({
        tripNumber: [''],
        vessel: [''],
        captain: [''],
        date: [''],
        loadingSite: [''],
      });
    }
  }
  checkFilledtripNumber(): void {
    if (this.searchForm.controls['tripNumber'].value === '') {
      this.filledtripNumber = false;
    } else {
      this.filledtripNumber = true;
    }
  }

  checkFilledVessel(): void {
    if (this.searchForm.controls['vessel'].value === '') {
      this.filledVessel = false;
    } else {
      this.filledVessel = true;
    }
  }

  checkFilledCaptain(): void {
    if (this.searchForm.controls['captain'].value === '') {
      this.filledCaptain = false;
    } else {
      this.filledCaptain = true;
    }
  }

  checkFilledDate(): void {
    if (this.searchForm.controls['date'].value === '') {
      this.filledDate = false;
    } else {
      this.filledDate = true;
    }
  }

  checkFilledLoadingSite(): void {
    if (this.searchForm.controls['loadingSite'].value === '') {
      this.filledLoadingSite = false;
    } else {
      this.filledLoadingSite = true;
    }
  }

  // Fonction pour les actions des boutons
  search(): void {
    this.loading = true;

    this.registersList = [];
    this.registerEntriesService.getRegisterEntriesByConcession(this.pageIndex, this.pageSize, this.sort, this.searchForm).subscribe(
      res => {
        this.registersList = res['data'].map(re => new RegisterEntry(re));
        this.totalRecords = res['total'];
        this.pageSize = res['pageSize'];
        this.pageIndex = res['page'];
      }
    );

    this.loading = false;
  }

  cancelFilter(): void {
    // Vide les champs de recherche
    this.searchForm = this.fb.group({
      tripNumber: [''],
      vessel: [''],
      captain: [''],
      date: [''],
      loadingSite: ['']
    });
    this.filledtripNumber = false;
    this.filledVessel = false;
    this.filledDate = false;
    this.filledLoadingSite = false;

    // Vide la liste des formulaires
    this.registersList = [];
    this.totalRecords = 0;
  }
  read(form: RegisterEntry): void {
    this.router.navigate(['/read', form.id]);
  }
  customPage(event: LazyLoadEvent) {
    this.loading = true;

    this.pageIndex = event.first / event.rows + 0; // Index of the new page if event.page not defined.

    if (event.rows) {
      this.pageSize = event.rows;
    }

    if (event.sortField) {
      if (event.sortOrder === 1) {
        this.sort = event.sortField;
      } else {
        this.sort = '-' + event.sortField;
      }
    }

    this.registerEntriesService.getRegisterEntriesByConcession(this.pageIndex, this.pageSize, this.sort, this.searchForm).subscribe(
      res => {
        this.registersList = res['data'].map(re => new RegisterEntry(re));
        this.totalRecords = res['total'];
        this.pageSize = res['pageSize'];
        this.pageIndex = res['page'];
      }
    );

    this.loading = false;
  }

}
