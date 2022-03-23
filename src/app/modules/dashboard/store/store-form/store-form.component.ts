import { Validators } from '@angular/forms';
import { FormHeader } from './../../../../common/models/form-header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.scss']
})
export class StoreFormComponent implements OnInit {

  headers: FormHeader[] = [
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
    // {
    //   name: "email",
    //   title: "E-mail",
    //   parents: ['account'],
    //   type: 'email',
    //   value: '',
    //   validators: [
    //     {
    //       validatorFn: Validators.required,
    //       message: 'the email is required'
    //     },
    //     {
    //       validatorFn: Validators.email,
    //       message: 'this field must be an email'
    //     }
    //   ]
    // },
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
      name: "phoneNumber",
      title: "phone_number",
      parents: ['account'],
      type: 'string',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'phone_number_required'
        }
      ]
    },
    {
      name: "address",
      title: "address",
      parents: ['account'],
      type: 'textarea',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'address_required'
        }
      ]
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


  constructor() { }

  ngOnInit(): void {
  }

}
