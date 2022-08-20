import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  error: string | null;
  statisticsLoading = true;
  items = [
    {
    title: 'admins',
    icon: 'fas fa-users-cog',
    count: 0,
    name: 'admins'
  },
    {
      title: 'clients',
      icon: 'fas fa-users',
      count: 0,
      name: 'clients'
    },
    {
      title: "events",
      icon: "fas fa-calendar-alt",
      count: 0,
      name: 'events'
    },
    {
      title: "articles",
      icon: "fas fa-newspaper",
      count: 0,
      name: 'articles'
    },
    {
      title: "categories",
      icon: "fas fa-tags",
      count: 0,
      name: 'categories'
    },
    {
      title: "notifications",
      icon: "fas fa-bell",
      count: 0,
      name: 'notifications'
    },
  ]

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics(){
    this.statisticsLoading = true;
    this.error = null;
    this.dashboardService.statistics().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.statisticsLoading = false;
        this.items = this.items.map((item) => ({...item, count: resp[item.name ? item.name : item.title]}))
        console.log("statistics done");
      },
      error: err => {
        console.log(err);
        this.error = err;
        this.statisticsLoading = false;
      }
    })
  }






}
