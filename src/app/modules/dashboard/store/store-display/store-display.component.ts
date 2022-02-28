import { StoreService } from './../../../../services/store.service';
import { DOMAIN_URL } from './../../../../common/constants';
import { DashboardService } from './../../../../services/dashboard.service';
import { OrderState } from './../../../../common/models/enums/order-state';
import { Component, OnInit } from '@angular/core';

import { ChartOptions } from 'src/app/common/models/chart-options';
import { ActivatedRoute, Route } from '@angular/router';
import { timeStamp } from 'console';

@Component({
  selector: 'app-store-display',
  templateUrl: './store-display.component.html',
  styleUrls: ['./store-display.component.scss']
})
export class StoreDisplayComponent implements OnInit {

  ordersLoading = true;
  storeSellsLoading = true;
  storeOrdersLoading = true;
  storeOrdersCount = 0;
  showOrder = 0;

  ordersChart: {colors: string[], labels: string[], max: number, values: number[]} = {
    colors: ["#ED0F0F", "#0F59ED", "#855E14", "#287F1C"],
    labels: [OrderState.IN_PROGRESS, OrderState.IN_DELIVERY, OrderState.RECEIVED, OrderState.CANCELED],
    max: 0,
    values: []
  }

  sellsChart: {title: string, dataName: string, categories: string[], values: number[]} = {
    title: 'Store Sells in last month',
    dataName: "sells",
    categories: this.monthBefore(),
    values: []
  }

  storeId: number;
  store: any;
  products: any[];
  deliveryMen: any[];
  orders: any[];

  constructor(private route: ActivatedRoute, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getDataId();
  }

  monthBefore () {
    const date = new Date()
    return [...new Array(31).keys()].map((e, ind) => {
      if(ind) date.setDate(date.getDate() - 1)
      return date.getDate() + ' ' + date.toString().slice(4, 7)
    }).reverse()
  }

  getDataId(){
    this.route.queryParamMap
    .subscribe(
      query => {
        const id = query.get('id');
        if(id) this.storeId = +id
        this.getStore();
        this.getProducts();
        this.getDeliveryMen();
        this.getOrdersStatistics();
        this.grtStoreSells();
        this.getStoreOrders();
      }
    )
  }

  getStore(){
    this.storeService.store(this.storeId)
    .subscribe({
      next: (resp: any) => {
        this.store = resp.data;
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getProducts(){
    this.storeService.products(this.storeId, {limit: 8})
    .subscribe({
      next: (resp: any) => {
        this.products = resp.data.products
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getDeliveryMen(){
    this.storeService.deliveryMen(this.storeId, {limit: 8})
    .subscribe({
      next: (resp: any) => {
        this.deliveryMen = resp.data.deliveryMen
        console.log(resp);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getOrdersStatistics(){
    this.ordersLoading = true
    this.storeService.orderStatistics(this.storeId)
    .subscribe({
      next: (resp: any) => {

        const statistics = [
          (resp.data['in progress']),
          (resp.data['in delivery']),
          (resp.data['received']),
          (resp.data['canceled'])
        ]

        this.ordersChart.max = Math.max(...statistics)
        this.ordersChart.values = statistics.map(v => v ? v * 100 / this.ordersChart.max : 0)
        this.ordersLoading = false
      },
      error: err => {
        this.ordersLoading = false
        console.log(err);
      }
    })
  }

  grtStoreSells(){
    this.storeSellsLoading = true
    this.storeService.sells(this.storeId)
    .subscribe({
      next: (resp: any) => {
        this.sellsChart.values = this.monthBefore().map(e => 0)
        resp.data.map((s: any) => {
          const ind = new Date().getDate() - new Date(s.createdAt).getDate()
          this.sellsChart.values[30 - ind]++
        })
        this.storeSellsLoading = false
      },
      error: err => {
        this.ordersLoading = false
      }
    })
  }

  getStoreOrders(){
    this.storeOrdersLoading = true
    this.storeService.orders(this.storeId, {skip: 0, take: 3})
    .subscribe({
      next: (resp: any) => {
        this.storeOrdersCount = resp.data.count;
        this.orders = resp.data.orders
        this.storeOrdersLoading = false
      },
      error: err => {
        this.storeOrdersLoading = false
      }
    })
  }

  productPhoto(product: any){
    return DOMAIN_URL + "" + product.photo
  }
}
