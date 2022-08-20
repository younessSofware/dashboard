import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationDisplayComponent } from './notification-display/notification-display.component';
import { NotificationFormComponent } from './notification-form/notification-form.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { NotificationComponent } from './notification.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: NotificationListComponent
      },
      {
        path: 'form/:type',
        component: NotificationFormComponent
      },
      {
        path: 'display',
        component: NotificationDisplayComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
