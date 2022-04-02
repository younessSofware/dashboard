import { AccountService } from 'src/app/services/account.service';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { DeliveryMenService } from './../../../../services/delivery-men.service';
import { ActivatedRoute } from '@angular/router';
import { OrderState } from './../../../../common/models/enums/order-state';
import { Chart } from './../../../../common/models/Chart';
import { Component, OnInit } from '@angular/core';
import { AccountState } from 'src/app/common/models/enums/account-state';

@Component({
  selector: 'app-delivery-man-display',
  templateUrl: './delivery-man-display.component.html',
  styleUrls: ['./delivery-man-display.component.scss']
})
export class DeliveryManDisplayComponent implements OnInit {


  charts: Chart[] = []

  deliveryManId: number;
  deliveryMan: any;

  profileError: string;

  ordersCount = 0;
  orders: any[];
  ordersError: string;
  ordersLimit = 5;

  constructor(private route: ActivatedRoute, private deliveryManService: DeliveryMenService, private translateService: TranslateService,
    private accountService: AccountService) { }

  async ngOnInit() {
    this.getDataId();
    this.charts = [
      {
        name: 'orders',
        type: 'radial',
        title: 'Delivery man Orders in',
        categories: await this.getOrdersStates(),
        colors: ["#ED0F0F", "#0F59ED", "#855E14", "#287F1C"],
        max: 0,
        values: []
      }
    ]
  }

  monthBefore () {
    const date = new Date()
    return [...new Array(31).keys()].map((e, ind) => {
      if(ind) date.setDate(date.getDate() - 1)
      return date.getDate() + ' ' + date.toString().slice(4, 7)
    })
  }

  async getOrdersStates(){
    return [
     await firstValueFrom(this.translateService.get(OrderState.IN_PROGRESS)),
     await firstValueFrom(this.translateService.get(OrderState.IN_DELIVERY)),
     await firstValueFrom(this.translateService.get(OrderState.RECEIVED)),
     await firstValueFrom(this.translateService.get(OrderState.CANCELED))
   ];
 }

  getDataId(){
    this.route.queryParamMap
    .subscribe(
      query => {
        const id = query.get('id');
        if(id) this.deliveryManId = +id
        this.getDeliveryMan();
        this.getOrdersStatistics();
        // this.grtPurchases()
        this.getOrders();
      }
    )
  }

  getDeliveryMan(){
    this.deliveryManService.deliveryMan(this.deliveryManId)
    .subscribe({
      next: (resp: any) => {
        this.deliveryMan = resp.data;
      },
      error: err => {
        this.profileError = err;
        console.log(err);
      }
    })
  }

  getOrdersStatistics(){
    this.deliveryManService.orderStatistics(this.deliveryManId)
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
        console.log(err);
      }
    })
  }

  getOrders(skip = 0){
    this.orders = []
    this.deliveryManService.orders(this.deliveryManId, {skip: skip, take: this.ordersLimit})
    .subscribe({
      next: (resp: any) => {
        this.ordersCount = resp.data.count;
        this.orders = resp.data.orders
      },
      error: (err: any) => {
        this.ordersError = err;
      }
    })
  }

  enable(){
    this.accountService.enable(this.deliveryMan.account.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.deliveryMan.account.state = AccountState.ENABLED
      },
      error: err => {
        console.log(err);
      }
    })
  }

  block(){
    this.accountService.block(this.deliveryMan.account.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.deliveryMan.account.state = AccountState.BLOCKED
      },
      error: err => {
        console.log(err);
      }
    })
  }

  suspend(){
    this.accountService.suspend(this.deliveryMan.account.id).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.deliveryMan.account.state = AccountState.SUSPENDED
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
