import { AccountState } from '../../../../common/models/enums/account-state';
import { AccountRole } from './../../../../common/models/enums/account-role';
import { Button } from 'src/app/common/models/button';
import { Component, OnInit } from '@angular/core';
import { Header } from 'src/app/common/models/header';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  headers: Header[] = [
    {
      name: "id",
      title: "id"
    },
    {
      name: "name",
      title: "full_name",
    },
    {
      name: "email",
      title: "email",
      search: true
    },
    {
      name: "city",
      title: "city",
    },
    {
      name: "phone",
      title: "phone_number",
    },
    {
      name: "created_at",
      title: "created_at",
      type: "date"
    },
    {
      name: "active",
      title: "status",
      type: 'tag',
      tagsColors: {
        [AccountState.CREATED]: 'bg-blue-200',
        [AccountState.ENABLED]: 'bg-green-200',
      }
    }
  ];

  tableButtons: Button[] = [
    {
      name: 'block',
      title: 'block',
      icon: 'fas fa-ban',
      color: 'blue',
      dataField: 'users.id',
      request: {
        url: 'users',
        method: 'delete',
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
  ];

  buttons: Button[] = [
    // {
    //   name: 'messages',
    //   icon: 'fas fa-comments',
    //   color: 'blue',
    //   routerLink: {
    //     link: '/dashboard/messages',
    //     query: {
    //       id: ':account.id',
    //       name: ':account.name',
    //       role: AccountRole.CLIENT
    //     }
    //   }
    // }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
