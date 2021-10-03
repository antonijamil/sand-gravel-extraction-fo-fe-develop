import {Routes} from '@angular/router';
import {listViewRoutesNames} from '@features/list-view/list-view.routes.names';
import {ListViewCaptainComponent} from '@features/list-view/pages/list-view-captain/list-view-captain.component';
import {ListViewConcessionComponent} from '@features/list-view/pages/list-view-concession/list-view-concession.component';

export const LISTVIEW_ROUTES: Routes = [
  {
    path: listViewRoutesNames.CAPTAIN,
    component: ListViewCaptainComponent
  },
  {
    path: listViewRoutesNames.CONCESSION,
    component: ListViewConcessionComponent
  }
];
