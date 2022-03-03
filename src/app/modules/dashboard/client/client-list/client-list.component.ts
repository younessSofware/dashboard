import { AccountState } from './../../../../common/models/account-state';
import { AccountRole } from './../../../../common/models/enums/account-role';
import { Button } from 'src/app/common/models/button';
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
      title: "full name",
      search: true
    },
    // {
    //   parents: ['account'],
    //   name: "email",
    //   title: "email",
    //   search: true
    // },
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
    },
    {
      parents: ['account'],
      name: "state",
      title: "state",
      type: 'tag',
      tagsColors: {
        [AccountState.CREATED]: 'bg-blue-200',
        [AccountState.ENABLED]: 'bg-green-200',
        [AccountState.BLOCKED]: 'bg-red-200',
        [AccountState.SUSPENDED]: 'bg-red-200'
      }
    }
  ];


  tableButtons: Button[] = [
    {
      name: 'block',
      title: 'block',
      icon: 'fas fa-ban',
      color: 'blue',
      dataField: 'account.id',
      request: {
        url: 'accounts/block',
        method: 'put',
      },
      confirmation: {
        title: 'Block Store Account',
        text: 'Are you sure you want to block those store account',
        confirmButtonText: 'Yes',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'No',
        icon: 'warning'
      }
    },
    {
      name: 'suspend',
      title: 'suspend',
      icon: 'fas fa-pause',
      color: 'blue',
      dataField: 'account.id',
      request: {
        url: 'accounts/suspend',
        method: 'put',
      },
      confirmation: {
        title: 'Suspend Store Account',
        text: 'Are you sure you want to suspend those store account',
        confirmButtonText: 'Yes',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'No',
        icon: 'warning'
      }
    },
    {
      name: 'enable',
      title: 'enable',
      icon: 'fas fa-lightbulb',
      color: 'blue',
      dataField: 'account.id',
      request: {
        url: 'accounts/enable',
        method: 'put',
      },
      confirmation: {
        title: 'Enable Store Account',
        text: 'Are you sure you want to enable those store account',
        confirmButtonText: 'Yes',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'No',
        icon: 'warning'
      }
    },
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
          role: AccountRole.CLIENT
        }
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
