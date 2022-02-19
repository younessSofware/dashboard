import { Button } from './../../../../common/models/button';
import { Header } from './../../../../common/models/header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-display',
  templateUrl: './store-display.component.html',
  styleUrls: ['./store-display.component.scss']
})
export class StoreDisplayComponent implements OnInit {

  headers: Header[] = [
    {
      name: "id",
      title: "id"
    },
    {
      name: "name",
      title: "full name",
      parents: ['account']
    },
    {
      name: "storeName",
      title: "store name",
    },
    {
      name: "email",
      title: "email",
      parents: ['account']
    },
    {
      name: "phoneNumber",
      title: "phone number",
      parents: ['account']
    },
    {
      name: "address",
      title: "address",
      parents: ['account'],
      default: 'none'
    },
    {
      name: "longitude",
      title: "longitude",
      parents: ['account'],
      default: "none"
    },
    {
      name: "latitude",
      title: "latitude",
      parents: ['account'],
      default: "none"
    },
  ];

  buttons: Button[] = [
    {
      name: 'Edit',
      icon: 'fas fa-edit',
      link: '/dashboard/stores/form/edit?id=:id',
      color: 'gray',
    },
    {
      name: 'Delete',
      icon: 'fas fa-trash-alt',
      color: 'red',
      request: {
        url: 'stores/:id',
        method: 'delete',
        redirectURL: '/dashboard/stores/list'
      },
      confirmation: {
        title: 'Delete Store',
        text: 'Are you sure you want to delete this store',
        confirmButtonText: 'Yes',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'No',
        icon: 'warning'
      }
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
