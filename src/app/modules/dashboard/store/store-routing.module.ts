import { StoreDisplayComponent } from './store-display/store-display.component';
import { StoreFormComponent } from './store-form/store-form.component';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreComponent } from './store.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: StoreListComponent
      },
      {
        path: 'form/:type',
        component: StoreFormComponent
      },
      {
        path: 'display',
        component: StoreDisplayComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
