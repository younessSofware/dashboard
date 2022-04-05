import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  @Input() orders: any[];
  @Input() count = 0;
  @Input() error: string;
  @Input() limit = 1;

  @Output() onPageChange = new EventEmitter<number>();

  skip = 0;
  showOrder = 0;

  get currentPage(){
    return this.skip / this.limit;
  }

  get pages(){
    return [...new Array(Math.ceil(this.count / this.limit)).keys()]
  }

  constructor() { }

  ngOnInit(): void {
    this.skip = 0;
  }

  changePage(page: number){
    this.skip = page * this.limit
    this.onPageChange.emit(this.skip)
  }

}
