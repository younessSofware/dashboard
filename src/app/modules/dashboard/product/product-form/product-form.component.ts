import { StoreService } from './../../../../services/store.service';
import { DashboardService } from './../../../../services/dashboard.service';
import { Validators } from '@angular/forms';
import { FormHeader } from './../../../../common/models/form-header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  headers: FormHeader[] = [];
  categories: any[];
  stores: any[];

  constructor(private storeService: StoreService, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getStores();
  }

  getCategories(){
    this.dashboardService.getCategories()
    .subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.categories = resp.data;
        if(this.stores) this.initializeHeaders();
      },
      error: err => {
        console.log(err);
      }
    })
  }


  getStores(){
    this.storeService.stores()
    .subscribe({
      next: (resp: any) => {
        console.log("stores: ", resp);
        this.stores = resp.data;
        if(this.categories) this.initializeHeaders();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  initializeHeaders(){
    this.headers = [
      {
        name: "photo",
        title: "",
        type: "image",
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'photo_required'
          }
        ]
      },
      {
        name: "id",
        title: "id",
        hidden: true,
        value: ''
      },
      {
        name: 'name',
        title: 'product_name',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'product_name_required'
          }
        ]
      },
      {
        name: "description",
        title: "description",
        type: 'textarea',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'description_required'
          },
          {
            validatorFn: Validators.maxLength(300),
            message: 'description_max_ch'
          },
          {
            validatorFn: Validators.minLength(5),
            message: 'description_min_ch'
          }
        ]
      },
      {
        name: 'store',
        title: 'store',
        type: 'select',
        selectOptions: {
          options: this.stores,
          valueProperty: 'id',
          nameProperty: 'storeName'
        },
        validators: [
          {
            validatorFn: Validators.required,
            message: 'product store is required'
          }
        ]
      },
      {
        name: 'category',
        title: 'category',
        type: 'select',
        selectOptions: {
          options: this.categories,
          valueProperty: 'name',
          nameProperty: 'name'
        },
        validators: [
          {
            validatorFn: Validators.required,
            message: 'product category is required'
          }
        ]
      },
      {
        name: "price",
        title: "price",
        type: 'number',
        value: 0,
        validators: [
          {
            validatorFn: Validators.required,
            message: 'product price is required'
          },
          {
            validatorFn: Validators.min(1),
            message: 'product price is not valid'
          }
        ]
      },
      {
        name: "quantity",
        title: "stock",
        type: 'number',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'product stock is required'
          },
          {
            validatorFn: Validators.min(1),
            message: 'product stock is not valid'
          }
        ]
      },
    ];
  }

}
