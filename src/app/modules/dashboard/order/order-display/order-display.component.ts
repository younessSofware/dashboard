import { DOMAIN_URL } from './../../../../common/constants';
import { OrderService } from './../../../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
      },
      error: err => {
        this.error = err;
        console.log(err);
      }
    })
  }

}
