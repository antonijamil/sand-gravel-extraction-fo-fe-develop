import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login.component';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BaNgCommonModule} from '@bang/common';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {LOGIN_ROUTES} from '@features/login/login.routes';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(LOGIN_ROUTES),
    FormsModule,
    BaNgCommonModule.forRoot(),
    CalendarModule,
    InputNumberModule
    // RouterModule.forRoot(LOGIN_ROUTES)
  ]
  // exports: [RouterModule]
})
export class LoginModule { }
