import { OrderService } from './../../../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.scss']
})
export class OrderDisplayComponent implements OnInit {

  orderId: any;
  order: any;
  charts = [];
  error: any;
  map: any;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderId();
  }

  getOrderId(){
    this.route.queryParamMap.subscribe({
      next: params => {
        this.orderId = params.get('id');
        this.getOrder()
      }
    })
  }

  getOrder(){
    this.orderService.getOrder(this.orderId).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.order = resp.data;
        this.initMap();
      },
      error: err => {
        this.error = err;
        console.log(err);
      }
    })
  }

  private initMap(): void {

    const {client, store} = this.order;

    this.map = Leaflet.map('map', {
      center: [ store.account.latitude, store.account.longitude ],
      zoom: 17
    });
    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.addMarker('store : ' + store.storeName, store.account.longitude, store.account.latitude, "red")
    this.addMarker('client : ' + client.account.name, client.account.longitude, client.account.latitude, "green")
    this.drawPolyLine({lat: client.account.latitude, lng: client.account.longitude}, {lat: store.account.latitude, lng: store.account.longitude})
  }

  addMarker(text: string, longitude: number, latitude: number, color = "blue"){
    const icon = new Leaflet.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const marker = Leaflet.marker({lat: latitude, lng: longitude}, {icon});

    marker.bindPopup(text).openPopup()

    this.map.addLayer(marker)
  }

  drawPolyLine(point1: any, point2: any){
    const polyline = Leaflet.polyline([point1, point2], {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    })
    this.map.addLayer(polyline)
  }
}
