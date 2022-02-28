import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  @Input() orders: any[];
  @Input() count = 0;
  showOrder = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
