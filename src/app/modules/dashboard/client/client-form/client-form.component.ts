import { Validators } from '@angular/forms';
import { FormHeader } from './../../../../common/models/form-header';
import { Header } from './../../../../common/models/header';
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
      name: "name",
      title: "full name",
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
      type: 'textarea',
      value: ''
    },
    {
      name: "longitude",
      title: "longitude",
      type: 'number',
      value: ''
    },
    {
      name: "latitude",
      title: "latitude",
      type: 'number',
      value: ''
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
