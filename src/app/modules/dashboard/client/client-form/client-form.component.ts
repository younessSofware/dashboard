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
    {
      name: "email",
      title: "email",
      parents: ['account'],
      type: 'email',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'email_required'
        },
        {
          validatorFn: Validators.email,
          message: 'email_email'
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
      type: 'map'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
