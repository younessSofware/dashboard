import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { Chart } from './../../../../common/models/Chart';
import { ClientService } from './../../../../services/client.service';
import { OrderState } from './../../../../common/models/enums/order-state';
import { ActivatedRoute } from '@angular/router';
import { DOMAIN_URL } from './../../../../common/constants';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AccountState } from 'src/app/common/models/enums/account-state';

@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.scss']
})
export class ClientDisplayComponent implements OnInit {

  charts: Chart[] = []
  clientId: number;
  client: any;

  profileError: string;

  orders: any[];
  ordersError: string;
  ordersLimit = 5;
  ordersCount = 0;

  constructor(private route: ActivatedRoute, private clientService: ClientService, private translateService: TranslateService,
    private accountService: AccountService) { }

  async ngOnInit() {
    console.log("month before: ", this.monthBefore());
    this.getDataId();
    this.charts = [
      {
        name: await firstValueFrom(this.translateService.get('orders')),
        type: 'radial',
        title: 'client_orders',
        categories: await this.getOrdersStates(),
        colors: ["#ED0F0F", "#0F59ED", "#855E14", "#287F1C"],
        max: 0,
        values: []
      },
      {
        name: await firstValueFrom(this.translateService.get('purchases')),
        title: 'client_purchases_last_month',
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
        if(id) this.clientId = +id
        this.getClient();
        this.getOrdersStatistics();
        this.grtPurchases()
        this.getOrders();
      }
    )
  }

  getClient(){
    this.clientService.client(this.clientId)
    .subscribe({
      next: (resp: any) => {
        this.client = resp.data;
      },
      error: err => {
        this.profileError = err;
      }
    })
  }

  getOrdersStatistics(){
    this.clientService.orderStatistics(this.clientId)
    .subscribe({
      next: (resp: any) => {
        console.log(resp);
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

  grtPurchases(){
    this.clientService.purchases(this.clientId)
    .subscribe({
      next: (resp: any) => {
        this.charts[1].values = this.monthBefore().map(e => 0)
        resp.data.map((s: any) => {
          const ind = Math.floor((new Date().getTime() - new Date(s.createdAt).getTime()) / 1000 / 60 / 60 / 24)
          this.charts[1].values[30 - ind] += s.amount
        })
      },
      error: err => {
        this.charts[1].error = err;
      }
    })
  }

  getOrders(skip = 0){
    this.orders = []
    this.clientService.orders(this.clientId, {skip: skip, take: this.ordersLimit})
    .subscribe({
      next: (resp: any) => {
        console.log("client orders resp", resp);
        this.ordersCount = resp.data.count;
        this.orders = resp.data.orders
      },
      error: err => {
        this.ordersError = err;
      }
    })
  }

  enable(){
    this.accountService.enable(this.client.account.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.client.account.state = AccountState.ENABLED
      },
      error: err => {
        console.log(err);
      }
    })
  }

  block(){
    this.accountService.block(this.client.account.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.client.account.state = AccountState.BLOCKED
      },
      error: err => {
        console.log(err);
      }
    })
  }

  suspend(){
    this.accountService.suspend(this.client.account.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.client.account.state = AccountState.SUSPENDED
      },
      error: err => {
        console.log(err);
      }
    })
  }
}