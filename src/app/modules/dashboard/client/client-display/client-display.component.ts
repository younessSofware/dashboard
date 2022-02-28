import { ClientService } from './../../../../services/client.service';
import { OrderState } from './../../../../common/models/enums/order-state';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from './../../../../services/dashboard.service';
import { ChartOptions } from 'src/app/common/models/chart-options';
import { DOMAIN_URL } from './../../../../common/constants';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.scss']
})
export class ClientDisplayComponent implements OnInit {

  ordersLoading = true;
  storeSellsLoading = true;
  clientOrdersLoading = true;
  purchasesLoading = true;

  ordersChart: {colors: string[], labels: string[], max: number, values: number[]} = {
    colors: ["#ED0F0F", "#0F59ED", "#855E14", "#287F1C"],
    labels: [OrderState.IN_PROGRESS, OrderState.IN_DELIVERY, OrderState.RECEIVED, OrderState.CANCELED],
    max: 0,
    values: []
  };

  purchasesChart: {title: string, dataName: string, categories: string[], values: number[]} = {
    title: 'Store Sells in last month',
    dataName: "sells",
    categories: this.monthBefore(),
    values: []
  }

  clientId: number;
  client: any;
  orders: any[];

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
        console.log(err);
      }
    })
  }

  getOrdersStatistics(){
    this.ordersLoading = true
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

  grtPurchases(){
    this.purchasesLoading = true
    this.clientService.purchases(this.clientId)
    .subscribe({
      next: (resp: any) => {
        console.log("store sells resp", resp);

        this.purchasesChart.values = this.monthBefore().map(e => 0)

        resp.data.map((s: any) => {
          const ind = new Date().getDate() - new Date(s.createdAt).getDate()
          this.purchasesChart.values[31 - ind] += s.amount
        })

        console.log(this.purchasesChart.values);
        this.purchasesLoading = false
      },
      error: err => {
        this.purchasesLoading = false
        console.log("store sells err", err);
      }
    })
  }

  getOrders(){
    this.clientOrdersLoading = true
    this.clientService.orders(this.clientId, {skip: 0, take: 3})
    .subscribe({
      next: (resp: any) => {
        console.log("client orders resp", resp);
        this.clientOrdersLoading = resp.data.count;
        this.orders = resp.data.orders
        this.clientOrdersLoading = false
      },
      error: err => {
        this.clientOrdersLoading = false
        console.log("client orders err", err);
      }
    })
  }

  productPhoto(product: any){
    return DOMAIN_URL + "" + product.photo
  }

}
