import { Button } from './../../../../common/models/button';
import { Component, OnInit } from '@angular/core';
import { Header } from 'src/app/common/models/header';

@Component({
  selector: 'app-client-display',
  templateUrl: './client-display.component.html',
  styleUrls: ['./client-display.component.scss']
})
export class ClientDisplayComponent implements OnInit {

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
      parents: ['account']
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
      color: 'gray',
      routerLink: {
        link: '/dashboard/clients/form/edit?id=:id',
      }
    },
    {
      name: 'Delete',
      icon: 'fas fa-trash-alt',
      color: 'red',
      request: {
        url: 'clients/:id',
        method: 'delete',
        redirectURL: '/dashboard/clients/list'
      },
      confirmation: {
        title: 'Delete Client',
        text: 'Are you sure you want to delete this client',
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
