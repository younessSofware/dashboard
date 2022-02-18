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
      name: "channels",
      icon: "fas fa-project-diagram",
      path: "/dashboard/channels/"
    },
    {
      name: "posts",
      icon: "fas fa-clone",
      path: "/dashboard/posts/"
    },
    {
      name: "comments",
      icon: "fas fa-comments",
      path: "/dashboard/comments/"
    },
    {
      name: "products",
      icon: "fas fa-box",
      path: "/dashboard/products/"
    },
    {
      name: "services",
      icon: "fas fa-cogs",
      path: "/dashboard/services/"
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

  constructor(private authService: AuthService, private router: Router) { }

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
