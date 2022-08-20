import { Button } from 'src/app/common/models/button';
import { Header } from '../../../../common/models/header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  headers: Header[] = [
    {
      name: "id",
      title: "id",
      hidden: true,
      value: ''
    },
    {
      name: "title",
      title: "title",
      search: true
    },
    {
      name: "type",
      title: "type",
    },
    {
      name: "image",
      title: "image",
      type: 'cover'
    },
    {
      name: "texte",
      title: "texte",
      maxLength: 40
    },
    {
      name: "created_at",
      title: "created_at",
      type: "date"
    },
  ];

  tableButtons: Button[] = [
    {
      name: 'block',
      title: 'block',
      icon: 'fas fa-ban',
      color: 'blue',
      dataField: 'articles.id',
      request: {
        url: 'articles',
        method: 'delete',
      },
      confirmation: {
        title: 'are_you_sure',
        text: 'block_article_conf_msg',
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
