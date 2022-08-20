import { Component, OnInit } from '@angular/core';
import { Button } from 'src/app/common/models/button';
import { Header } from 'src/app/common/models/header';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
    // 'background_color' => 'required',
  // 'limit_color' => 'required',
  // 'text_color' => 'required',
  // 'text_size' => 'required',
  // 'link' => 'required|string',
  // 'texte' => 'required|string',
  // 'display' => 'required|string'
  headers: Header[] = [
    {
      name: "id",
      title: "id",
      hidden: true,
      value: ''
    },
    {
      name: "background_color",
      title: "background_color",
      type: "color"

    },
    {
      name: "text_color",
      title: "text_color",
      type: "color"

    },
    {
      name: "created_at",
      title: "created_at",
      type: "date"
    },
    {
      name: "text_size",
      title: "text_size",
    },
    {
      name: "texte",
      title: "texte",
      maxLength: 30,
      search: true
    },
    {
      name: "limit_color",
      title: "limit_color",
      type: 'color'
    },
  ];

  tableButtons: Button[] = [
    {
      name: 'block',
      title: 'block',
      icon: 'fas fa-ban',
      color: 'blue',
      dataField: 'notifications.id',
      request: {
        url: 'notifications',
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

  ]
  constructor() { }

  ngOnInit(): void {
  }


}
