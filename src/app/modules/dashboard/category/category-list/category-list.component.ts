import { Header } from './../../../../common/models/header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

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
      title: "id",
    },
    {
      name: "name",
      title: "category_name",
      search: true
    },
    {
      name: "createdAt",
      title: "created_at",
      type: 'date',
      default: "none"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
