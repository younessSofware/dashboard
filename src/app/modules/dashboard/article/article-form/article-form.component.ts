import { Validators } from '@angular/forms';
import { FormHeader } from '../../../../common/models/form-header';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  categories: any[];
  headers: FormHeader[] = [];


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.initHeaders();

    this.dataService.sendGetRequest('categories/sort/1', {})
    .subscribe({
      next: (resp: any) => {
        this.categories = resp;
        this.initHeaders();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  initHeaders(){
    this.headers = [
      {
        name: "id",
        title: "id",
        hidden: true,
        value: ''
      },
      {
        name: "image",
        title: "image",
        type: "cover",
      },
      {
        name: "title",
        title: "title",
        type: 'text',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'name_required'
          }
        ]
      },
      {
        name: "texte",
        title: "texte",
        type: 'textarea',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'text_required'
          }
        ]
      },
      {
        name: "type",
        title: "category_type",
        type: 'select',
        selectOptions: {
          options: this.categories,
          valueProperty: 'name',
          nameProperty: 'name'
        },
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'name_required'
          }
        ]
      },
    ];
  }
}
