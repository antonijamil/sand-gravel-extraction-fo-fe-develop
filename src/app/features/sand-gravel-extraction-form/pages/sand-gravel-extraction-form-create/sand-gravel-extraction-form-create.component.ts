import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {LoadingSitesService} from '@core/http/loading-sites.service';
import {Unloading} from '@shared/model/unloading';
import {RegisterEntry} from '@shared/model/registerEntry';
import {appRoutesLinks} from '@app/app.routes.links';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CountriesService} from '@core/services/countries.service';
import {TranslateService} from '@ngx-translate/core';
import {VesselsService} from '@core/http/vessels.service';
import {ConcessionHoldersService} from '@core/http/concession-holders.service';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {RegisterEntriesService} from '@core/http/register-entries.service';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-sand-gravel-extraction-form-create',
  templateUrl: './sand-gravel-extraction-form-create.component.html',
  styleUrls: ['./sand-gravel-extraction-form-create.component.css']
})
export class SandGravelExtractionFormCreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public datepipe: DatePipe,
    private loadingSitesService: LoadingSitesService,
    private countriesService: CountriesService,
    private translateService: TranslateService,
    private vesselsService: VesselsService,
    private concessionHoldersService: ConcessionHoldersService,
    private registerEntriesService: RegisterEntriesService,
    private messageService: MessageService
              ) { }
    faTrash = faTrashAlt;

    form: FormGroup;

    shipOptions: any[];
    concessionCodeOptions: any[];
    loadingSitesOptions: any[];
    countryOptions: any[];

    minDate: Date;
    maxDate: Date;

    unloadingList: Unloading[];
    unloadingAvailable: boolean;

  ngOnInit(): void {

    this.form = this.fb.group({
      captain: new FormControl({value: 'Antonija Milcheva', disabled: true}, Validators.required),
      ship: new FormControl('', Validators.required),
      loadingStartDate: new FormControl(''), // Date on string format
      loadingStartDateInput: new FormControl('', Validators.required), // Date on date format
      loadingStopDate: new FormControl(''), // Date on string format
      loadingStopDateInput: new FormControl('', Validators.required), // Date on date format
      loadingStartTime: new FormControl(''),
      loadingStartTimeInput: new FormControl('', Validators.required),
      loadingStopTime: new FormControl(''),
      loadingStopTimeInput: new FormControl('', Validators.required),
      tripNumber: new FormControl(null, Validators.required),
      concessionHolder: new FormControl('', Validators.required),
      loadingSite: new FormControl('', Validators.required),
      loadedQuantity: new FormControl(null, Validators.required),
      differenceVolume: new FormControl(''),

      unloadedVolume: new FormControl(null),
      unloadingPlace: new FormControl(''),
      destination: new FormControl(''),
      destinationCountry: new FormControl(null),
      unloadings: new FormControl([]),

      swornStatement: [false, Validators.requiredTrue]
    }, { validators : [this.checkTremieFilling, this.checkUnloading]});

    // Get the Vessels with API call
    this.shipOptions = [];
    this.vesselsService.getAll().subscribe(vessels => {
        vessels.forEach( vessel => this.shipOptions.push({label: vessel.name, value: vessel}));
      }
    );

    // Limit the dates that the user can choose
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 1);
    this.maxDate = new Date();

    // Get the ConcessionCode with API call
    this.concessionCodeOptions = [];
    this.concessionHoldersService.getAll().subscribe(concessionHolders => {
      concessionHolders.forEach( c => {
        console.log(c);
        this.concessionCodeOptions.push({label: '' + c.concessionHolderNumber, value: c});
      });
      }
    );

    // Get the LoadingSites with API call
    this.loadingSitesOptions = [];
    this.loadingSitesService.getAll().subscribe(loadingSites => {
        loadingSites.forEach( res => this.loadingSitesOptions.push({label: res.name, value: res}));
      }
    );

    this.unloadingList = [];
    this.form.controls['unloadings'].setValue(this.unloadingList);
    this.unloadingAvailable = false;

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
  }

  // VALIDATION

  checkTremieFilling(group: FormGroup): ValidationErrors {
    if (group.controls['ship'].value && group.controls['loadedQuantity'].value) {
      if ((group.controls['ship'].value.tremie - group.controls['loadedQuantity'].value) < 0) {
        if (!group.controls['differenceVolume'].value) {
          return {tremieTooFull: true};
        }
      } else if ( group.controls['loadedQuantity'].value / group.controls['ship'].value.tremie < 0.8) {
        if (!group.controls['differenceVolume'].value) {
          return {tremieNotFull: true};
        }
      }
    }
    return null;
  }

  checkUnloading(group: FormGroup): ValidationErrors { // Not used at the moment
    if (group.controls['ship'].value && group.controls['loadedQuantity'].value) {
      if (group.controls['unloadings'].value.length === 0) {
        return {noUnloading: true};
      } else {
        let totalUnloading = 0;
        group.controls['unloadings'].value.forEach(u => totalUnloading += u.unloadedVolume);
        if (group.controls['loadedQuantity'].value - totalUnloading < 0) {
          return {tooMuchUnloaded: true};
        } else if (totalUnloading / group.controls['loadedQuantity'].value < 0.9 ) {
          if (!group.controls['differenceVolume'].value) {
            return {notCompletelyUnloaded: true};
          }
        }
      }
    }
    return null;
  }

  checkValidUnloading() {
    if (this.form.controls['unloadedVolume'].value && this.form.controls['unloadingPlace'].value && this.form.controls['destination'].value && this.form.controls['destinationCountry'].value) {
      this.unloadingAvailable = true;
    } else {
      this.unloadingAvailable = false;
    }
  }

  // ACTION BUTTON
  generatetripNumber() {
    const date = this.datepipe.transform(this.form.controls['loadingStartDateInput'].value, 'yyyyMMdd');
    const IMO = this.form.controls['ship'].value.IMO;
    this.form.controls['tripNumber'].setValue(date + IMO);

  }

  addUnloading() {
    const unloadedVolume = this.form.controls['unloadedVolume'].value;
    const unloadingPlace = this.form.controls['unloadingPlace'].value;
    const destination = this.form.controls['destination'].value;
    const destinationCountry = this.form.controls['destinationCountry'].value;

    const newUnloading = new Unloading(unloadedVolume, unloadingPlace, destination, destinationCountry);

    this.unloadingList.push(newUnloading);

    this.form.controls['unloadedVolume'].setValue(null);
    this.form.controls['unloadingPlace'].setValue(null);
    this.form.controls['destination'].setValue(null);
    this.form.controls['destinationCountry'].setValue(null);

    this.unloadingAvailable = false;
  }

  deleteUnloading(unloading) {
    const index =  this.unloadingList.findIndex(u => u.unloadedVolume === unloading.unloadedVolume
      && u.unloadingPlace === unloading.unloadingPlace
      && u.destination === unloading.destination
      && u.destinationCountry === unloading.destinationCountry);
    if (index > -1) {
      this.unloadingList.splice(index, 1);
      this.form.controls['unloadings'].setValue(this.unloadingList); // To launch the validation function
    }
  }

  cancel(): void {
    this.router.navigate(appRoutesLinks.LISTVIEW_CAPTAIN);
  }

  addNewRegistryEntry() {
    if (this.form.valid) {
      this.form.controls['loadingStartDate'].setValue(this.datepipe.transform(this.form.controls['loadingStartDateInput'].value, 'yyyy-MM-dd'));
      this.form.controls['loadingStopDate'].setValue(this.datepipe.transform(this.form.controls['loadingStopDateInput'].value, 'yyyy-MM-dd'));
      this.form.controls['loadingStartTime'].setValue(this.datepipe.transform(this.form.controls['loadingStartTimeInput'].value, 'HH:mmZZZZ'));
      this.form.controls['loadingStopTime'].setValue(this.datepipe.transform(this.form.controls['loadingStopTimeInput'].value, 'HH:mmZZZZ'));

      console.log(this.form.value);

      const registerEntry: RegisterEntry = new RegisterEntry(this.form.value);
      registerEntry.startDateTime = this.datepipe.transform(this.form.controls['loadingStartDateInput'].value, 'yyyy-MM-dd') + 'T' + this.datepipe.transform(this.form.controls['loadingStartTimeInput'].value, 'HH:mmZZZZZ');
      registerEntry.stopDateTime = this.datepipe.transform(this.form.controls['loadingStopDateInput'].value, 'yyyy-MM-dd') + 'T' + this.datepipe.transform(this.form.controls['loadingStopTimeInput'].value, 'HH:mmZZZZZ');

      // TODO Retrieve the actual captain
      registerEntry.captain = {id: 1};

      console.log(registerEntry);

      this.registerEntriesService.add(registerEntry).subscribe(res => {
        if (!res) {
          this.messageService.add({severity: 'error', summary: 'Server Error', detail: 'There was an error at the server. The registery has not been created! Please Try again.'});
        } else {
          this.messageService.add({severity: 'success', summary: 'Saved', detail: 'Your new registery has succesfully saved'});
        }
      });
    } else {
      console.log('Form is invalid');
    }

  }

}
