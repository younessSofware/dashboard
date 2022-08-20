import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',

      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'clients',
        loadChildren: () => import("./client/client.module").then(m => m.ClientModule)
      },      {
        path: 'admins',
        loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule)
      },
      {
        path: 'events',
        loadChildren: () => import("./event/event.module").then(m => m.EventModule)
      },
      {
        path: 'articles',
        loadChildren: () => import("./article/article.module").then(m => m.ArticleModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'notifications',
        loadChildren: () => import("./notification/notification.module").then(m => m.NotificationModule),
        canActivate: [AdminGuard]
      },
      {
        path: 'categories',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
        canActivate: [AdminGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
