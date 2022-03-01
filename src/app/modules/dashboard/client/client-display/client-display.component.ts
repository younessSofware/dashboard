import { Chart } from './../../../../common/models/Chart';
import { ClientService } from './../../../../services/client.service';
import { OrderState } from './../../../../common/models/enums/order-state';
import { ActivatedRoute } from '@angular/router';
import { DOMAIN_URL } from './../../../../common/constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.scss']
})
export class ClientDisplayComponent implements OnInit {

  charts: Chart[] = [
    {
      name: 'Sells',
      title: 'Client purchases in last month',
      type: 'line',
      categories: this.monthBefore(),
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
  clientId: number;
  client: any;

  profileError: string;

  orders: any[];
  ordersError: string;
  ordersLimit = 5;
  ordersCount = 0;

  constructor(private route: ActivatedRoute, private clientService: ClientService) { }

  ngOnInit(): void {
    this.getDataId();
  }

  monthBefore () {
    const date = new Date()
    return [...new Array(31).keys()].map((e, ind) => {
      if(ind) date.setDate(date.getDate() - 1)
      return date.getDate() + ' ' + date.toString().slice(4, 7)
    })
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
        this.charts[1].max = max
        this.charts[1].values = statistics.map(v => v ? v * 100 / max : 0)
      },
      error: err => {
        this.charts[1].error = err;
      }
    })
  }

  grtPurchases(){
    this.clientService.purchases(this.clientId)
    .subscribe({
      next: (resp: any) => {
        this.charts[0].values = this.monthBefore().map(e => 0)

        resp.data.map((s: any) => {
          const ind = new Date().getDate() - new Date(s.createdAt).getDate()
          this.charts[0].values[31 - ind] += s.amount
        })
      },
      error: err => {
        this.charts[0].error = err;
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

}
