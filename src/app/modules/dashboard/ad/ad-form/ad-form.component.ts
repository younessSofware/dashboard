import { Header } from 'src/app/common/models/header';
import { ProductService } from './../../../../services/product.service';
import { StoreService } from './../../../../services/store.service';
import { FormHeader } from './../../../../common/models/form-header';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss']
})
export class AdFormComponent implements OnInit {

  stores: any[] = [];
  products: any[] = [];
  offers: any[] = [];

  headers: FormHeader[] = [];

  constructor(private storeService: StoreService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getStores();
  }

  getStores(){
    this.storeService.stores().subscribe({
      next: (resp: any) => {
        this.stores = resp.data.stores;
        if(this.stores.length) this.getProducts(this.stores[0].id);
        else this.initializeHeader();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getProducts(storeId: number){
    this.storeService.products(storeId, {}).subscribe({
      next: (resp: any) => {
        this.products = resp.data.products;
        this.headers.forEach(h => h.name == 'product' && h.selectOptions ? h.selectOptions.options = this.products : null)
        if(this.products.length) this.getOffers(this.products[0].id);
        else if(!this.headers.length) this.initializeHeader();

        console.log("products", resp.data.products);
        
      },
      error: err => {
        console.log(err);
      }
    })
  }

  getOffers(productId: number){
    this.productService.offers(productId).subscribe({
      next: (resp: any) => {
        this.offers = resp.data;
        if(!this.headers.length) this.initializeHeader();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  initializeHeader(){
    this.headers = [
      {
        name: "id",
        title: "id",
        hidden: true,
        value: ''
      },
      {
        name: 'photo',
        title: 'photo',
        type: 'cover',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'photo_required'
          }
        ]
      },
      {
        name: "store",
        title: "store",
        type: 'select',
        selectOptions: {
          nameProperty: 'storeName',
          valueProperty: 'id',
          options: this.stores
        },
        validators: [
          {
            validatorFn: Validators.required,
            message: 'store_required'
          }
        ]
      },
      {
        name: "product",
        title: "product",
        type: 'select',
        selectOptions: {
          nameProperty: 'name',
          valueProperty: 'id',
          options: this.products
        }
      },
      {
        name: "offer",
        title: "offer",
        type: 'select',
        selectOptions: {
          nameProperty: 'name',
          valueProperty: 'id',
          options: this.offers
        }
      }
    ];
  }

  valueChanged(data: any){
    if(data.name == 'store') this.getProducts(data.value)
    if(data.name == 'product') this.getOffers(data.value)
  }

  headerChanged(headers: Header[]){
    this.headers = headers
  }
}
