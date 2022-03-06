import { Validators } from '@angular/forms';
import { FormHeader } from './../../../../common/models/form-header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

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
      parents: ['account'],
      name: "name",
      title: "full_name",
      type: 'text',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'full_name_required'
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
