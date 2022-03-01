import { AccountRole } from './../../../../common/models/enums/account-role';
import { Button } from 'src/app/common/models/button';
import { Header } from 'src/app/common/models/header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-man-list',
  templateUrl: './delivery-man-list.component.html',
  styleUrls: ['./delivery-man-list.component.scss']
})
export class DeliveryManListComponent implements OnInit {

  headers: Header[] = [
    {
      name: "id",
      title: "id"
    },
    {
      parents: ['account'],
      name: "name",
      title: "full name",
      search: true
    },
    {
      parents: ['account'],
      name: "email",
      title: "email",
      search: true
    },
    {
      parents: ['store'],
      name: "id",
      title: "store ID",
      type: 'hidden',
      search: true
    },
    {
      parents: ['store'],
      name: "storeName",
      title: "store name",
      search: true
    },
    {
      parents: ['account'],
      name: "phoneNumber",
      title: "Phone Number",
      search: true
    },
    {
      parents: ['account'],
      name: "address",
      title: "address",
      default: 'none',
      maxLength: 80
    },
    {
      parents: ['account'],
      name: "longitude",
      title: "longitude"
    },
    {
      parents: ['account'],
      name: "latitude",
      title: "latitude"
    },
    {
      name: "createdAt",
      title: "Created at",
      type: "date"
    }
  ];


  buttons: Button[] = [
    {
      name: 'messages',
      icon: 'fas fa-comments',
      color: 'blue',
      routerLink: {
        link: '/dashboard/messages',
        query: {
          id: ':account.id',
          name: ':account.name',
          role: AccountRole.DELIVERY_MAN
        }
      }
    }
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
