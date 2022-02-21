import { Header } from './../../../../common/models/header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  headers: Header[] = [
    {
      name: "photo",
      title: "",
      type: "image",
      sort: false,
      align: 'center'
    },
    {
      name: "id",
      title: "id"
    },
    {
      name: 'name',
      title: 'product name'
    },
    {
      parents: ['store'],
      name: 'storeName',
      title: 'store'
    },
    {
      parents: ['store', 'account'],
      name: 'name',
      title: 'store Owner'
    },
    {
      name: "description",
      title: "description",
      maxLength: 80
    },
    {
      name: "quantity",
      title: "stock",
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
