import { Header } from './../../../../common/models/header';
import { AccountState } from './../../../../common/models/enums/account-state';
import { AccountRole } from './../../../../common/models/enums/account-role';
import { Button } from './../../../../common/models/button';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss']
})
export class AdListComponent implements OnInit {

  headers: Header[] = [
    {
      name: "id",
      title: "id",
    },
    {
      name: "photo",
      title: "",
      type: 'cover'
    },
    {
      parents: ['store'],
      name: "storeName",
      title: "store",
      default: 'none'
    },
    {
      parents: ['product'],
      name: "name",
      title: "product",
      default: 'none'
    },
    {
      parents: ['offer'],
      name: "percent",
      title: "offer",
      default: 'none',
    },
    {
      name: "createdAt",
      title: "created_at",
      type: "date"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
