import { Button } from './../../../../common/models/button';
import { List } from 'src/app/common/models/list';
import { Header } from './../../../../common/models/header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.scss']
})
export class DisplayProductComponent implements OnInit {
  headers: Header[] = [
    {
      name: "photo",
      title: "",
      type: "image"
    },
    {
      name: "_id",
      title: "id"
    },
    {
      name: "label",
      title: "label"
    },
    {
      name: "description",
      title: "description"
    },
    {
      name: "country",
      title: "country",
      width: '1/2'
    },
    {
      name: "city",
      title: "city",
      width: '1/2'
    },
    {
      name: "price",
      title: "price"
    },
    {
      name: "currency",
      title: "currency"
    },
    {
      name: "deletedAt",
      title: "status",
      type: 'boolean',
      reverseBooleanColors: true,
      values: ['Enabled', 'Disabled']
    },
    {
      name: "sold",
      title: "Availability",
      type: 'boolean',
      values: ['Available', 'Sold']
    },
    {
      name: 'user',
      title: 'Creator',
      link: '/dashboard/users/display?id=:user'
    }
  ];

  list: List = {
    headers: [
      {
        name: '_id',
        title: 'id'
      },
      {
        name: 'message',
        title: 'message',
        maxLength: 500
      },
      {
        name: 'createdAt',
        title: 'date',
        type: 'date'
      }
    ],
    buttons: [
      {
        icon: 'fas fa-broom',
        color: 'indigo',
        name: 'clear reports',
        request: {
          url: 'product/:id/clearReports',
          method: 'post'
        }
      }
    ],
    rowsButtons: [
      {
        icon: 'fas fa-eye',
        name: '',
        color: 'indigo',
        link: '/dashboard/reports/display?id=:_id'
      }
    ],
    icon: 'fas fa-exclamation-triangle',
    title: 'list of reports',
    name: 'reports'
  }

  buttons: Button[] = [
    {
      name: 'Enable',
      icon: 'fas fa-lightbulb',
      color: 'green',
      request: {
        url: 'product/:id/status',
        method: 'post'
      },
      condition: 'deletedAt'
    },
    {
      name: 'Disable',
      icon: 'far fa-lightbulb',
      color: 'red',
      request: {
        url: 'product/:id/status',
        method: 'post'
      },
      condition: '!deletedAt'
    },
    {
      name: 'Edit',
      icon: 'fas fa-edit',
      link: '/dashboard/products/form/edit?id=:id',
      color: 'gray',
    },
    {
      name: 'Delete',
      icon: 'fas fa-trash-alt',
      color: 'red',
      request: {
        url: 'channel/dash/:id',
        method: 'delete',
        redirectURL: '/dashboard/channels/list'
      },
      confirmation: {
        title: 'Delete Product',
        text: 'Are you sure you want to delete this product',
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
