import { AccountRole } from './../../../../common/models/enums/account-role';
import { Button } from 'src/app/common/models/button';
import { Header } from './../../../../common/models/header';
import { Component, OnInit } from '@angular/core';
import { AccountState } from 'src/app/common/models/enums/account-state';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

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
      name: 'storeName',
      title: 'store_name',
      search: true
    },
    {
      parents: ['account'],
      name: "name",
      title: "owner",
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
      title: "phone_number",
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
      title: "created_at",
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
        [AccountState.SUSPENDED]: 'bg-yellow-100'
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
        title: 'are_you_sure',
        text: 'block_account_conf_msg',
        confirmButtonText: 'yes',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'no',
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
        title: 'are_you_sure',
        text: 'suspend_account_conf_msg',
        confirmButtonText: 'yes',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'no',
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
        title: 'are_you_sure',
        text: 'enable_account_conf_msg',
        confirmButtonText: 'yes',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'no',
        icon: 'warning'
      }
    },
  ];

  rowButtons: Button[] = [
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
