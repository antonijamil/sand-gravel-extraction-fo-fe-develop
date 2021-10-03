import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterEntry} from '../../../../shared/model/registerEntry';
import {appRoutesLinks} from '@app/app.routes.links';
import {Router, NavigationExtras} from '@angular/router';
import {faBook, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {LoadingSitesService} from '@core/http/loading-sites.service';
import {RegisterEntriesService} from '@core/http/register-entries.service';
import {LazyLoadEvent} from 'primeng';
import {faTimesCircle} from '@fortawesome/free-regular-svg-icons';
import {CountriesService} from '@core/services/countries.service';
import {TranslateService} from '@ngx-translate/core';
import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-list-view-captain',
  templateUrl: './list-view-captain.component.html',
  styleUrls: ['./list-view-captain.component.css']
})
export class ListViewCaptainComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translateService: TranslateService,
    private loadingSiteService: LoadingSitesService,
    private registerEntriesService: RegisterEntriesService,
    private countriesService: CountriesService
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
  countryOptions: any[];
  registersList: RegisterEntry[];

  // Variables to indicate if the field is empty
  filledtripNumber: boolean;
  filledVessel: boolean;
  filledConcessionCode: boolean;
  filledDate: boolean;
  filledLoadingSite: boolean;
  filledDestination: boolean;
  filledDestinationCountry: boolean;

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
      concessionCode: [''],
      date: [''],
      loadingSite: [''],
      destination: [''],
      destinationCountry: ['']
    });

    this.loading = true;

    // Information about the field Date
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 10);
    this.maxDate = new Date();
    this.maxYear = this.maxDate.getFullYear();
    this.minYear = this.maxYear - 10;
    this.yearRange = this.minYear + ':' + this.maxYear;

    // Change the format of loadingSite's attributes
    this.loadingSitesOptions = [];
    this.loadingSiteService.getAll().subscribe(loadingSites => {
        loadingSites.forEach( res => this.loadingSitesOptions.push({label: res.name, value: res.id}));
      }
    );

    // Get the Countries with country.json in assets
    this.countryOptions = [];
    this.countriesService.getAll().subscribe(countries => {
      if (this.translateService.currentLang === 'fr') {
        countries.forEach( country => this.countryOptions.push({label: country['frenchValue'], value: country['value']}));
      } else if (this.translateService.currentLang === 'nl') {
        countries.forEach( country => this.countryOptions.push({label: country['dutchValue'], value: country['value']}));
      } else {
        countries.forEach( country => this.countryOptions.push({label: country['value'], value: country['value']}));
      }
    });

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

  clearConcessionCode(): void {
    this.searchForm.controls['concessionCode'].setValue('');
    this.filledConcessionCode = false;
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

  clearDestination(): void {
    this.searchForm.controls['destination'].setValue('');
    this.filledDestination = false;
    this.checkPristine();
  }

  clearDestinationCountry(): void {
    this.searchForm.controls['destinationCountry'].setValue('');
    this.filledDestinationCountry = false;
    this.checkPristine();
  }

  checkPristine(): void {
    if (this.searchForm.controls['tripNumber'].value === '' && this.searchForm.controls['vessel'].value === '' && this.searchForm.controls['concessionCode'].value === '' && this.searchForm.controls['date'].value === '' && this.searchForm.controls['loadingSite'].value === '' && this.searchForm.controls['destination'].value === '' && this.searchForm.controls['destinationCountry'].value === '') {
      this.searchForm = this.fb.group({
        tripNumber: [''],
        vessel: [''],
        concessionCode: [''],
        date: [''],
        loadingSite: [''],
        destination: [''],
        destinationCountry: ['']
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

  checkFilledConcessionCode(): void {
    if (this.searchForm.controls['concessionCode'].value === '') {
      this.filledConcessionCode = false;
    } else {
      this.filledConcessionCode = true;
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

  checkFilledDestination(): void {
    if (this.searchForm.controls['destination'].value === '') {
      this.filledDestination = false;
    } else {
      this.filledDestination = true;
    }
  }

  checkFilledDestinationCountry(): void {
    if (this.searchForm.controls['destinationCountry'].value === '') {
      this.filledDestinationCountry = false;
    } else {
      this.filledDestinationCountry = true;
    }
  }

  // Fonction pour les actions des boutons
  search(): void {
    this.loading = true;

    this.registersList = [];
    this.registerEntriesService.getRegisterEntriesByCaptain(this.pageIndex, this.pageSize, this.sort, this.searchForm).subscribe(
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
      concessionCode: [''],
      date: [''],
      loadingSite: [''],
      destination: [''],
      destinationCountry: ['']
    });
    this.filledtripNumber = false;
    this.filledVessel = false;
    this.filledConcessionCode = false;
    this.filledDate = false;
    this.filledLoadingSite = false;
    this.filledDestination = false;
    this.filledDestinationCountry = false;

    // Vide la liste des formulaires
    this.registersList = [];
    this.totalRecords = 0;
  }

  read(form: RegisterEntry): void {
    this.router.navigate(['/read', form.id]);
  }

  newForm(): void {
    this.router.navigate(appRoutesLinks.SANDGRAVELEXTRACTIONFORM_CREATE);
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

    this.registerEntriesService.getRegisterEntriesByCaptain(this.pageIndex, this.pageSize, this.sort, this.searchForm).subscribe(
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
