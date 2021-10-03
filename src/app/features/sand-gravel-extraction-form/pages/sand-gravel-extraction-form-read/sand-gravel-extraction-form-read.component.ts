import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterEntriesService} from '@core/http/register-entries.service';
import {RegisterEntry} from '@shared/model/registerEntry';
import {DatePipe} from '@angular/common';
import {appRoutesLinks} from '@app/app.routes.links';

@Component({
  selector: 'app-sand-gravel-extraction-form-read',
  templateUrl: './sand-gravel-extraction-form-read.component.html',
  styleUrls: ['./sand-gravel-extraction-form-read.component.css']
})
export class SandGravelExtractionFormReadComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe,
    private registerEntriesService: RegisterEntriesService,
  ) {  }

  public registerEntry: RegisterEntry;
  public dataAvailable = false;

  ngOnInit(): void {

    this.registerEntriesService.getById(this.route.snapshot.params.id).subscribe(res => {
      this.registerEntry = res;
      this.registerEntry.loadingStartDate = this.datepipe.transform(this.registerEntry.startDateTime, 'dd MMMM yyyy');
      this.registerEntry.loadingStartTime = this.datepipe.transform(this.registerEntry.startDateTime, 'HH:mm:ss');
      this.registerEntry.loadingStopDate = this.datepipe.transform(this.registerEntry.stopDateTime, 'dd MMMM yyyy');
      this.registerEntry.loadingStopTime = this.datepipe.transform(this.registerEntry.stopDateTime, 'HH:mm:ss');
      this.dataAvailable = true;
    });
  }

  return(): void {
    this.router.navigate(appRoutesLinks.LISTVIEW_CAPTAIN);
  }

}
