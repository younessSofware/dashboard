import { AdFormComponent } from './ad-form/ad-form.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { AdComponent } from './ad.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: AdListComponent
      },
      {
        path: 'form/:type',
        component: AdFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdRoutingModule { }
