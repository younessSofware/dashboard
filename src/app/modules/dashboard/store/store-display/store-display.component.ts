import { TranslateService } from '@ngx-translate/core';
import { Chart } from './../../../../common/models/Chart';
import { StoreService } from './../../../../services/store.service';
import { DOMAIN_URL } from './../../../../common/constants';
import { OrderState } from './../../../../common/models/enums/order-state';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AccountState } from 'src/app/common/models/enums/account-state';

@Component({
  selector: 'app-store-display',
  templateUrl: './store-display.component.html',
  styleUrls: ['./store-display.component.scss']
})
export class StoreDisplayComponent implements OnInit {

  charts: Chart[] = []

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
  ordersLimit = 5;

  get storeSearchQuery(){
    return encodeURIComponent(JSON.stringify({
      store: {
        id: this.storeId
      }
    }))
  }

  constructor(private route: ActivatedRoute, private storeService: StoreService, private translateService: TranslateService,
    private accountService: AccountService) { }

  async ngOnInit() {
    this.getDataId();
    this.charts = [
      {
        name: await firstValueFrom(this.translateService.get('orders')),
        type: 'radial',
        title: 'Store Orders in',
        categories: await this.getOrdersStates(),
        colors: ["#ED0F0F", "#0F59ED", "#855E14", "#287F1C"],
        max: 0,
        values: []
      },
      {
        name: await firstValueFrom(this.translateService.get('sales')),
        title: 'store_sales_last_month',
        type: 'line',
        categories: this.monthBefore(),
        colors: ["#ED0F0F", "#0F59ED", "#855E14", "#287F1C"],
        max: 0,
        values: []
      }
    ]
  }

  async getOrdersStates(){
     return [
      await firstValueFrom(this.translateService.get(OrderState.IN_PROGRESS)),
      await firstValueFrom(this.translateService.get(OrderState.IN_DELIVERY)),
      await firstValueFrom(this.translateService.get(OrderState.RECEIVED)),
      await firstValueFrom(this.translateService.get(OrderState.CANCELED))
    ];
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
        this.grtStoreSales();
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
        this.charts[0].max = max
        this.charts[0].values = statistics.map(v => v ? v * 100 / max : 0)
      },
      error: err => {
        this.charts[0].error = err;
      }
    })
  }

  grtStoreSales(){
    this.storeService.sales(this.storeId)
    .subscribe({
      next: (resp: any) => {
        this.charts[1].values = this.monthBefore().map(e => 0)
        resp.data.map((s: any) => {
          const ind = Math.floor((new Date().getTime() - new Date(s.createdAt).getTime()) / 1000 / 60 / 60 / 24)
          this.charts[1].values[30 - ind]++
        })
      },
      error: err => {
        this.charts[1].error = err;
      }
    })
  }

  getOrders(skip = 0){
    this.orders = [];
    this.storeService.orders(this.storeId, {skip: skip, take: this.ordersLimit})
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

  enable(){
    this.accountService.enable(this.store.account.id).subscribe({
      next: resp => {
        console.log(resp);
        this.store.account.state = AccountState.ENABLED
      },
      error: err => {
        console.log(err);
      }
    })
  }

  block(){
    this.accountService.block(this.store.account.id).subscribe({
      next: resp => {
        console.log(resp);
        this.store.account.state = AccountState.BLOCKED
      },
      error: err => {
        console.log(err);
      }
    })
  }

  suspend(){
    this.accountService.suspend(this.store.account.id).subscribe({
      next: resp => {
        console.log(resp);
        this.store.account.state = AccountState.SUSPENDED
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
