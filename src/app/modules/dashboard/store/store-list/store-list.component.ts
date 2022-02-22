import { AccountRole } from './../../../../common/models/enums/account-role';
import { Button } from 'src/app/common/models/button';
import { Header } from './../../../../common/models/header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  headers: Header[] = [
    {
      name: "id",
      title: "id"
    },
    {
      name: 'storeName',
      title: 'store name'
    },
    {
      parents: ['account'],
      name: "name",
      title: "owner name"
    },
    {
      parents: ['account'],
      name: "email",
      title: "email",
    },
    {
      parents: ['account'],
      name: "phoneNumber",
      title: "Phone Number"
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
          name: ':storeName',
          role: AccountRole.STORE
        }
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
