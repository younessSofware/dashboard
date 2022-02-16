import { Header } from './../../../../common/models/header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  headers: Header[] = [
    {
      name: "photo",
      title: "",
      type: "avatar",
      sort: false,
      align: 'center'
    },
    {
      name: "_id",
      title: "id"
    },
    {
      name: "label",
      title: "label"
    },
    {
      name: "description",
      title: "description",
      maxLength: 80
    },
    {
      name: "city",
      title: "city"
    },
    {
      name: "price",
      title: "price"
    },
    {
      name: "currency",
      title: "currency"
    },
    {
      name: "deletedAt",
      title: "status",
      type: 'boolean',
      reverseBooleanColors: true,
      values: ['Enabled', 'Disabled']
    },
    {
      name: "available",
      title: "availability",
      type: 'boolean',
      values: ['sold', 'available']
    },
    {
      name: "reports",
      title: "reports"
    }
  ];
  user: any

  constructor() { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }
}
