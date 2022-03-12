import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'clients',
        loadChildren: () => import("./client/client.module").then(m => m.ClientModule)
      },
      {
        path: 'stores',
        loadChildren: () => import("./store/store.module").then(m => m.StoreModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'messages',
        loadChildren: () => import('./message/message.module').then(m => m.MessageModule),
      },
      {
        path: 'delivery-men',
        loadChildren: () => import('./delivery-man/delivery-man.module').then(m => m.DeliveryManModule),
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule),
      },
      {
        path: 'orders',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
