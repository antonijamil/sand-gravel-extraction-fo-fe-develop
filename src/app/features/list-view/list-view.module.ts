import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LISTVIEW_ROUTES} from '@features/list-view/list-view.routes';
import {SharedModule} from '@shared/shared.module';
import {ListViewCaptainComponent} from './pages/list-view-captain/list-view-captain.component';
import { ListViewConcessionComponent } from './pages/list-view-concession/list-view-concession.component';

@NgModule({
  declarations: [
    ListViewCaptainComponent,
    ListViewConcessionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(LISTVIEW_ROUTES)
  ]
})
export class ListViewModule { }
