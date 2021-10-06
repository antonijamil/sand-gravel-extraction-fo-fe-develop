import {Routes} from '@angular/router';
import {appRoutesNames} from '@app/app.routes.names';
import {ErrorComponent} from '@bang/common';
import {PermissionGuard} from '@core/guards/permission-guard';
import {AuthGuard} from '@core/guards/auth.guard';
import {loginRoutesNames} from '@features/login/login.routes.names';
import {LoginComponent} from '@features/login/pages/login.component';

export const APP_ROUTES: Routes = [
  {
    path: appRoutesNames.SANDGRAVELEXTRACTIONFORM,
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/sand-gravel-extraction-form/sand-gravel-extraction-form.module').then(m => m.SandGravelExtractionFormModule),
    data: {
      category: appRoutesNames.SANDGRAVELEXTRACTIONFORM
    }
  },
  {
    path: appRoutesNames.LISTVIEW,
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/list-view/list-view.module').then(m => m.ListViewModule),
    data: {
      category: appRoutesNames.LISTVIEW
    }
  },
  {
    path: appRoutesNames.LOGIN,
    // component: LoginComponent,
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
    data: {
      category: appRoutesNames.LOGIN
    }
  },
  {
    path: appRoutesNames.ERROR,
    component: ErrorComponent
  },
  {
    path: '**',
    component: ErrorComponent,
    data: {
      code: 404
    }
  }
];
