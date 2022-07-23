import { DeliveryManDisplayComponent } from './delivery-man-display/delivery-man-display.component';
import { DeliveryManFormComponent } from './delivery-man-form/delivery-man-form.component';
import { DeliveryManListComponent } from './delivery-man-list/delivery-man-list.component';
import { DeliveryManComponent } from './delivery-man.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DeliveryManComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: DeliveryManListComponent
      },
      {
        path: 'form/:type',
        component: DeliveryManFormComponent
      },
      {
        path: 'display',
        component: DeliveryManDisplayComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryManRoutingModule { }
