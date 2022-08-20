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
      name: "id",
      title: "id",
    },
    {
      name: "name",
      title: "category_name",
      search: true
    },
    {
      name: "type",
      title: "category_type",
    },
    {
      name: "created_at",
      title: "created_at",
      type: 'date',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
