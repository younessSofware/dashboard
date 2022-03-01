import { Chart } from './../../../../common/models/Chart';
import { StoreService } from './../../../../services/store.service';
import { DOMAIN_URL } from './../../../../common/constants';
import { OrderState } from './../../../../common/models/enums/order-state';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-display',
  templateUrl: './store-display.component.html',
  styleUrls: ['./store-display.component.scss']
})
export class StoreDisplayComponent implements OnInit {

  charts: Chart[] = [
    {
      name: 'Sells',
      title: 'Store Sells in last month',
      type: 'line',
      categories: this.monthBefore(),
      colors: ["#ED0F0F", "#0F59ED", "#855E14", "#287F1C"],
      max: 0,
      values: []
    },
    {
      name: 'Orders',
      type: 'radial',
      title: 'Store Orders in',
      categories: [OrderState.IN_PROGRESS, OrderState.IN_DELIVERY, OrderState.RECEIVED, OrderState.CANCELED],
      colors: ["#ED0F0F", "#0F59ED", "#855E14", "#287F1C"],
      max: 0,
      values: []
    }
  ]

  showOrder = 0;
  ordersCount = 0;

  storeId: number;
  store: any;
  profileError: string;

  products: any[];
  productsError: string;
  productsCount = 0;

  deliveryMen: any[];
  deliveryManError: string;
  deliveryMenCount = 0;

  orders: any[];
  ordersError: string;

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
        this.getOrders();
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
        this.profileError = err;
      }
    })
  }

  getProducts(){
    this.storeService.products(this.storeId, {limit: 8})
    .subscribe({
      next: (resp: any) => {
        this.products = resp.data.products
        this.productsCount = resp.data.count
        console.log(resp);
      },
      error: err => {
        this.productsError = err;
      }
    })
  }

  getDeliveryMen(){
    this.storeService.deliveryMen(this.storeId, {limit: 8})
    .subscribe({
      next: (resp: any) => {
        this.deliveryMen = resp.data.deliveryMen
        this.deliveryMenCount = resp.data.count;
        console.log(resp);
      },
      error: err => {
        this.deliveryManError = err;
      }
    })
  }

  getOrdersStatistics(){
    this.storeService.orderStatistics(this.storeId)
    .subscribe({
      next: (resp: any) => {

        const statistics = [
          (resp.data['in progress']),
          (resp.data['in delivery']),
          (resp.data['received']),
          (resp.data['canceled'])
        ]

        const max = Math.max(...statistics)
        this.charts[1].max = max
        this.charts[1].values = statistics.map(v => v ? v * 100 / max : 0)
      },
      error: err => {
        this.charts[1].error = err;
      }
    })
  }

  grtStoreSells(){
    this.storeService.sells(this.storeId)
    .subscribe({
      next: (resp: any) => {
        this.charts[0].values = this.monthBefore().map(e => 0)
        resp.data.map((s: any) => {
          const ind = new Date().getDate() - new Date(s.createdAt).getDate()
          this.charts[0].values[30 - ind]++
        })
      },
      error: err => {
        this.charts[0].error = err;
      }
    })
  }

  getOrders(){
    this.storeService.orders(this.storeId, {skip: 0, take: 3})
    .subscribe({
      next: (resp: any) => {
        this.ordersCount = resp.data.count;
        this.orders = resp.data.orders
      },
      error: err => {
        this.ordersError = err;
      }
    })
  }

  photo(product: any){
    return DOMAIN_URL + "" + product.photo
  }
}
