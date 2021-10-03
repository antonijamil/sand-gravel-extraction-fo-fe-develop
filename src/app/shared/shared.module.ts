import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  DropdownModule,
  InputTextareaModule,
  InputTextModule,
  SelectButtonModule,
  StepsModule,
  TableModule
} from 'primeng';
import {ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {BaNgCommonModule} from '@bang/common';

@NgModule({
  declarations: [],
  imports: [
    SelectButtonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    StepsModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
    DropdownModule,
    OverlayModule,
    CommonModule
  ],
  exports: [
    BaNgCommonModule,
    TranslateModule,
    TableModule,
    FontAwesomeModule
  ]
})
export class SharedModule {
}
