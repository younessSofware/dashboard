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
      title: "Category name",
    },
    {
      name: "createdAt",
      title: "creation date",
      default: "none"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
