import { NotificationService } from './../../../services/notification.service';
import { SocketService } from 'src/app/services/socket.service';
import { ModulesMessengerService } from './../../../services/modules-messenger.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuItems = [
    {
      name: "home",
      icon: "fas fa-home",
      path: "/dashboard/home"
    },
    {
      name: "notifications",
      icon: "fas fa-bell",
      path: "/dashboard/notifications/"
    },
    {
      name: "clients",
      icon: "fas fa-users",
      path: "/dashboard/clients/"
    },
    {
      name: "delivery men",
      icon: "fas fa-truck",
      path: "/dashboard/delivery-men/"
    },
    {
      name: "stores",
      icon: "fas fa-store",
      path: "/dashboard/stores/"
    },
    {
      name: "categories",
      icon: "fas fa-tags",
      path: "/dashboard/categories/"
    },
    {
      name: "products",
      icon: "fas fa-boxes",
      path: "/dashboard/products/"
    },
    {
      name: "messages",
      icon: "fas fa-comments",
      path: "/dashboard/messages/",
      notifications: 0
    },
  ];
  user: any;

  constructor( private router: Router, messengerService: ModulesMessengerService,
    private socketService: SocketService, private notificationService: NotificationService) {
    messengerService.getMessage().subscribe({
      next: message => {
        if(message.type == 'new-message'){
          // if(!router.url.includes('/dashboard/messages')){
          //   const item = this.menuItems.find(item => item.name == "messages");
          //   if(item && item.notifications != undefined) item.notifications += 1;
          // }
        }

        if(message.type == 'update-notification'){
          const item = this.menuItems.find(item => item.name == "notifications");
          if(item && item.notifications != undefined) item.notifications += message.data;
        }
      }
    })
  }

  ngOnInit(): void {
    this.getUser();
    this.countNotifications();
  }

  countNotifications(){
    this.notificationService.count().subscribe({
      next: (resp: any) => {
        console.log(resp);
        const item = this.menuItems.find(item => item.name == "notifications");
        if(item) {
          console.log(resp.data.count);
          item.notifications = resp.data.count;
          console.log(item);
        };
      },
      error: err => {
        console.log(err);
      }
    })
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login')
    this.socketService.disconnect()
    // this.authService.logout()
    // .subscribe(
    //   resp => {
    //     window.localStorage.removeItem('token');
    //     this.router.navigateByUrl('/auth')
    //     console.log();
    //   },
    //   err => {

    //   }
    // )
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('user')as string);
  }

}
