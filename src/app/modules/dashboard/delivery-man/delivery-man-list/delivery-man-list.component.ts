import { AccountState } from '../../../../common/models/enums/account-state';
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
      title: "full_name",
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
      title: "store_name",
      search: true
    },
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
