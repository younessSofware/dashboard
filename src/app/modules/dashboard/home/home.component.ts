import { StoreService } from './../../../services/store.service';
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
      title: 'clients',
      icon: 'fas fa-users',
      count: 0
    },
    {
      title: 'stores',
      icon: 'fas fa-users',
      count: 0
    },
    {
      title: 'delivery men',
      name: 'deliveryMen',
      icon: 'fas fa-users',
      count: 0
    },
    {
      title: 'products',
      icon: 'fas fa-users',
      count: 0
    },
    {
      title: 'orders',
      icon: 'fas fa-users',
      count: 0
    }
  ]

  constructor(private dashboardService: DashboardService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getStatistics()
    this.getStoresLocations();
  }

  getStatistics(){
    this.statisticsLoading = true;
    this.error = null;
    this.dashboardService.statistics().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.statisticsLoading = false;
        this.items = this.items.map((item) => ({...item, count: resp[item.name ? item.name : item.title]}))
      },
      error: err => {
        console.log(err);
        this.error = err;
        this.statisticsLoading = false;
      }
    })
  }

  getStoresLocations(){
    this.storeService.storesLocations().subscribe({
      next: resp => {
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
