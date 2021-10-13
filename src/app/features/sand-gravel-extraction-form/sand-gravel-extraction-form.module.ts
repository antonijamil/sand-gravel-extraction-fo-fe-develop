import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandGravelExtractionFormCreateComponent } from './pages/sand-gravel-extraction-form-create/sand-gravel-extraction-form-create.component';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';
import {SANDGRAVELEXTRACTIONFORM_ROUTES} from '@features/sand-gravel-extraction-form/sand-gravel-extraction-form.routes';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaNgCommonModule} from '@bang/common';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import { SandGravelExtractionFormReadComponent } from './pages/sand-gravel-extraction-form-read/sand-gravel-extraction-form-read.component';

@NgModule({
  declarations: [SandGravelExtractionFormCreateComponent, SandGravelExtractionFormReadComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(SANDGRAVELEXTRACTIONFORM_ROUTES),
    ReactiveFormsModule,
    FormsModule,
    BaNgCommonModule.forRoot(),
    CalendarModule,
    InputNumberModule
  ]
})
export class SandGravelExtractionFormModule { }
