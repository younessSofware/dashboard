import { DeliveryMenService } from './../../../../services/delivery-men.service';
import { ClientService } from './../../../../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { OrderState } from './../../../../common/models/enums/order-state';
import { Chart } from './../../../../common/models/Chart';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-man-display',
  templateUrl: './delivery-man-display.component.html',
  styleUrls: ['./delivery-man-display.component.scss']
})
export class DeliveryManDisplayComponent implements OnInit {


  charts: Chart[] = [
    {
      name: 'Orders',
      type: 'radial',
      title: 'Delivery man Orders in',
      categories: [OrderState.IN_PROGRESS, OrderState.IN_DELIVERY, OrderState.RECEIVED, OrderState.CANCELED],
      colors: ["#ED0F0F", "#0F59ED", "#855E14", "#287F1C"],
      max: 0,
      values: []
    }
  ]

  deliveryManId: number;
  deliveryMan: any;

  profileError: string;

  ordersCount = 0;
  orders: any[];
  ordersError: string;
  ordersLimit = 5;

  constructor(private route: ActivatedRoute, private deliveryManService: DeliveryMenService) { }

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
}
