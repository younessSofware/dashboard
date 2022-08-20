import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() showNotifications = new EventEmitter();
  @Output() hideNotifications = new EventEmitter();
  @Input() showNotification = false;
  menuItems: any[] = [];
  user: any;

  constructor( private router: Router, private authService: AuthService,
    public afAuth: AngularFireAuth) {

  }

  ngOnInit(): void {
    const user = this.getUser();
    this.initMenuItems();
  }
  initMenuItems(){
    if(this.user.role == 0){ // admin
      this.menuItems = [
        {
          name: "home",
          icon: "fas fa-home",
          path: "/dashboard/home"
        },        {
          name: "admins",
          icon: "fas fa-users-cog",
          path: "/dashboard/admins/"
        },
        {
          name: "clients",
          icon: "fas fa-users",
          path: "/dashboard/clients/"
        },
        {
          name: "articles",
          icon: "fas fa-newspaper",
          path: "/dashboard/articles/"
        },
        {
          name: "events",
          icon: "fas fa-calendar-alt",
          path: "/dashboard/events/"
        },    {
          name: "notifications",
          icon: "fas fa-bell",
          path: "/dashboard/notifications/"
        },
        {
          name: "categories",
          icon: "fas fa-tags",
          path: "/dashboard/categories/"
        },
      ]
    }else if(this.user.role == 1){
      this.menuItems = [
        {
          name: "profile",
          icon: "fas fa-id-badge",
          path: "/dashboard/clients/display"
        },
      ]
    }
  }


  async logout(){
    await this.afAuth.signOut();
    this.authService.logout();
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('user')as string);
  }




}
