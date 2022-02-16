import { Component, OnInit } from '@angular/core';
import { Header } from 'src/app/common/models/header';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  headers: Header[] = [
    {
      name: "id",
      title: "id"
    },
    {
      parents: ['account'],
      name: "name",
      title: "full name"
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
      parents: ['account'],
      name: "role",
      title: "role"
    },
    {
      name: "createdAt",
      title: "Created at",
      type: "date"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
