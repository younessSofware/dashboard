import { StoreService } from './../../../../services/store.service';
import { Validators } from '@angular/forms';
import { FormHeader } from './../../../../common/models/form-header';
import { DashboardService } from './../../../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-man-form',
  templateUrl: './delivery-man-form.component.html',
  styleUrls: ['./delivery-man-form.component.scss']
})
export class DeliveryManFormComponent implements OnInit {

  headers: FormHeader[] = [];
  stores: any[];

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.getStores();
  }

  getStores(){
    this.storeService.stores()
    .subscribe({
      next: (resp: any) => {
        console.log("stores: ", resp);
        this.stores = resp.data;
        this.initializeHeaders();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  initializeHeaders(){
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
        name: "name",
        title: "full name",
        parents: ['account'],
        type: 'text',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'the full name is required'
          }
        ]
      },
      {
        name: "email",
        title: "E-mail",
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
            message: 'the email is required'
          },
          {
            validatorFn: Validators.minLength(8),
            message: 'password must contains at least 8 characters'
          }
        ]
      },
      {
        name: "phoneNumber",
        title: "phone Number",
        parents: ['account'],
        type: 'string',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'the phone Number is required'
          }
        ]
      },
      {
        name: "address",
        title: "address",
        parents: ['account'],
        type: 'textarea',
        value: ''
      },
      {
        name: 'store',
        title: 'store',
        type: 'select',
        selectOptions: {
          nameProperty: 'storeName',
          valueProperty: 'id',
          options: this.stores
        }
      },
      {
        name: "longitude",
        title: "longitude",
        parents: ['account'],
        type: 'number',
        value: ''
      },
      {
        name: "latitude",
        title: "latitude",
        parents: ['account'],
        type: 'number',
        value: ''
      }
    ];
  }
}
