import {Routes} from '@angular/router';
import {SandGravelExtractionFormCreateComponent} from '@features/sand-gravel-extraction-form/pages/sand-gravel-extraction-form-create/sand-gravel-extraction-form-create.component';
import {sandGravelExtractionRoutesNames} from '@features/sand-gravel-extraction-form/sand-gravel-extraction-form.routes.names';
import {SandGravelExtractionFormReadComponent} from '@features/sand-gravel-extraction-form/pages/sand-gravel-extraction-form-read/sand-gravel-extraction-form-read.component';

export const SANDGRAVELEXTRACTIONFORM_ROUTES: Routes = [
  {
    path: sandGravelExtractionRoutesNames.CREATE,
    component: SandGravelExtractionFormCreateComponent
  },
  {
    path: sandGravelExtractionRoutesNames.READ,
    component: SandGravelExtractionFormReadComponent
  }
];
