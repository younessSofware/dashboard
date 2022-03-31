import { NotificationService } from './../../../services/notification.service';
import { SocketService } from 'src/app/services/socket.service';
import { ModulesMessengerService } from './../../../services/modules-messenger.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() showNotifications = new EventEmitter();
  @Output() hideNotifications = new EventEmitter();
  notificationsDisplayed = false;
  menuItems = [
    {
      name: "home",
      icon: "fas fa-home",
      path: "/dashboard/home"
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

  constructor( private router: Router, messengerService: ModulesMessengerService, private socketService: SocketService,
    private notificationService: NotificationService) {
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
          if(item && item.notifications != undefined){
            item.notifications += message.data;
            if(item.notifications < 0) item.notifications = 0
          }
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
        const item = this.menuItems.find(item => item.name == "notifications");
        if(item) {
          item.notifications = resp.data.count;
        };
      },
      error: err => {
        console.log(err);
      }
    })
  }

  logout(){
    this.hideNotifications.emit();
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login')
    this.socketService.disconnect()
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('user')as string);
  }

  showNots(){
    this.notificationsDisplayed = true;
    this.showNotifications.emit();
  }

  hideNots(){
    this.notificationsDisplayed = false;
    this.hideNotifications.emit();
  }
}
