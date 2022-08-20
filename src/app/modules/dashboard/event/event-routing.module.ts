import {  EventDisplayComponent } from './event-display/event-display.component';
import { EventFormComponent } from './event-form/event-form.component';
import {  EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './eventcomponent';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: EventListComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'form/:type',
        component: EventFormComponent
      },
      {
        path: 'display',
        component: EventDisplayComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
