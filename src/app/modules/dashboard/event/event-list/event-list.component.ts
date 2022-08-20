import { Button } from 'src/app/common/models/button';
import { Component, OnInit } from '@angular/core';
import { Header } from 'src/app/common/models/header';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  headers: Header[] = [
    {
      name: "id",
      title: "id",
      hidden: true,
      value: ''
    },
    {
      name: "name",
      title: "name",
      search: true
    },
    {
      name: "type",
      title: "type",
    },
    {
      name: "date_from",
      title: "date_from",
    },
    {
      name: "date_to",
      title: "date_to",
    },
    {
      name: "created_at",
      title: "created_at",
      type: "date"
    }
  ];

  tableButtons: Button[] = [
    {
      name: 'block',
      title: 'block',
      icon: 'fas fa-ban',
      color: 'blue',
      dataField: 'events.id',
      request: {
        url: 'events',
        method: 'delete',
      },
      confirmation: {
        title: 'are_you_sure',
        text: 'block_event_conf_msg',
        confirmButtonText: 'yes',
        confirmButtonColor: 'red',
        showCancelButton: true,
        cancelButtonText: 'no',
        icon: 'warning'
      }
    }
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
