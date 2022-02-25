import { SocketService } from 'src/app/services/socket.service';
import { ModulesMessengerService } from './../../../services/modules-messenger.service';
import { AuthService } from './../../../services/auth.service';
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
      name: "clients",
      icon: "fas fa-users",
      path: "/dashboard/clients/"
    },
    {
      name: "categories",
      icon: "fas fa-tags",
      path: "/dashboard/categories/"
    },
    {
      name: "stores",
      icon: "fas fa-store",
      path: "/dashboard/stores/"
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
    {
      name: "jobs",
      icon: "fas fa-business-time",
      path: "/dashboard/jobs/"
    },
    {
      name: "reports",
      icon: "fas fa-exclamation-triangle",
      path: "/dashboard/reports"
    },
  ];
  user: any;

  constructor(private authService: AuthService, private router: Router, messengerService: ModulesMessengerService, private socketService: SocketService) {
    messengerService.getMessage().subscribe({
      next: message => {
        if(message.type == 'new-message'){
          console.log("-----------------------");
          console.log("new message-not from menu", message.data);
          const item = this.menuItems.find(item => item.name == "messages");
          console.log(item);

          if(item && item.notifications != undefined) item.notifications += 1;
          console.log(item);
          console.log(this.menuItems);

        }
      }
    })
  }

  ngOnInit(): void {
    this.getUser();
    if(this.user.role == 'SUPER ADMIN'){
      this.menuItems.push(
        {
          name: "subscriptions",
          icon: "fas fa-money-check-alt",
          path: "/dashboard/subscriptions/"
        });
    }
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
