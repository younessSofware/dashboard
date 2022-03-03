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
      name: "storeName",
      title: "store name",
      type: 'text',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'the store name is required'
        }
      ]
    },
    {
      name: "name",
      title: "owner name",
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
