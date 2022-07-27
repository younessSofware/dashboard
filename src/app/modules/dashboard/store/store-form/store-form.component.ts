import { Validators } from '@angular/forms';
import { FormHeader } from './../../../../common/models/form-header';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {

  categories: any[];
  headers: FormHeader[] = [];


  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.categories = resp.data;
        this.categories = this.categories.map(c => ({id: c.name, name: c.name}))
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
        name: "id",
        title: "id",
        parents: ['account'],
        hidden: true,
        value: ''
      },
      {
        name: "photo",
        title: "",
        type: "image",
        value: ''
      },
      {
        name: "storeName",
        title: "store_name",
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
        name: "name",
        title: "owner",
        parents: ['account'],
        type: 'text',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'full_name_required'
          }
        ]
      },
      {
        name: "commerceNumber",
        title: "commerce_number",
        type: 'text',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'commerce_number_required'
          }
        ]
      },
      {
        name: "bankAccountNumber",
        title: "bank_account_number",
        type: 'number',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'bank_account_number_required'
          }
        ]
      },
      {
        name: 'categories',
        title: 'categories',
        type: 'multi-select',
        selectOptions: {
          nameProperty: 'name',
          options: this.categories,
          valueProperty: 'name'
        }
      },
      {
        name: "email",
        title: "email",
        parents: ['account'],
        type: 'email',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'the email is required'
          },
          {
            validatorFn: Validators.email,
            message: 'this field must be an email'
          }
        ]
      },
      {
        name: "password",
        title: "password",
        type: 'password',
        parents: ['account'],
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'password_required'
          },
          {
            validatorFn: Validators.minLength(8),
            message: 'password_min_ch'
          }
        ]
      },
      {
        title: "address",
        name: "address",
        parents: ['account'],
        type: 'map'
      }
    ];
  }
}
