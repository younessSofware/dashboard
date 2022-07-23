import { AccountState } from '../../../../common/models/enums/account-state';
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
      parents: ['account'],
      name: "stringAddress",
      title: "address",
      default: 'none',
      maxLength: 40
    },
    {
      name: "createdAt",
      title: "created_at",
      type: "date"
    },
    {
      parents: ['account'],
      name: "state",
      title: "status",
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
          role: AccountRole.CLIENT
        }
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
