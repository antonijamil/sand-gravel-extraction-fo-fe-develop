import {Routes} from '@angular/router';
import {LoginComponent} from '@features/login/pages/login.component';
import {loginRoutesNames} from '@features/login/login.routes.names';

export const LOGIN_ROUTES: Routes = [
  {
    path: loginRoutesNames.LOGIN,
    component: LoginComponent
  },
];
