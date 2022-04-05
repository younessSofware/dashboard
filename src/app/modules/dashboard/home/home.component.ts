import { DeliveryMenService } from './../../../services/delivery-men.service';
import { ClientService } from './../../../services/client.service';
import { StoreService } from './../../../services/store.service';
import { DashboardService } from './../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

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
  maps: any = {
    stores: null,
    clients: null,
    deliveryMen: null
  };

  constructor(private dashboardService: DashboardService, private storeService: StoreService, private clientService: ClientService,
    private deliveryMenService: DeliveryMenService) { }

  ngOnInit(): void {
    Object.keys(this.maps).forEach(key => this.initMap(key))
    this.getStatistics();
    this.getStoresLocations();
    this.getClientsLocations();
    this.getDeliveryMenLocations();
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

  getStoresLocations(){
    this.storeService.storesLocations().subscribe({
      next: (resp: any) => {
        console.log(resp);
        console.log("store locations");

        resp.data.forEach((store: any) => this.addMarker(store.storeName, store.longitude, store.latitude, 'stores') );
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getClientsLocations(){
    this.clientService.clientsLocations().subscribe({
      next: (resp: any) => {
        console.log(resp);
        resp.data.forEach((client: any) => this.addMarker(client.name, client.longitude, client.latitude, 'clients') );
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getDeliveryMenLocations(){
    this.deliveryMenService.deliveryMenLocations().subscribe({
      next: (resp: any) => {
        resp.data.forEach((deliveryMan: any) => this.addMarker(deliveryMan.name, deliveryMan.longitude, deliveryMan.latitude, 'deliveryMen') );
      },
      error: err => {
        console.log(err);
      }
    })
  }

  private initMap(id: string): void {
    this.maps[id] = Leaflet.map(id, {
      center: [ 23.7294493, 46.2676419 ],
      zoom: 2
    });
    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.maps[id]);
  }

  addMarker(text: string, longitude: number, latitude: number, id: string){
    const marker = Leaflet.marker({lat: latitude, lng: longitude});

    marker.bindPopup(text).openPopup()

    this.maps[id].addLayer(marker)
  }

}
