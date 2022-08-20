import { Validators } from '@angular/forms';
import { FormHeader } from './../../../../common/models/form-header';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
      name: "password_confirmation",
      title: "password_confirmation",
      type: 'password',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'password_confirmation_required'
        },
        {
          validatorFn: Validators.minLength(8),
          message: 'password_confirmation_min_ch'
        }
      ]
    },
    {
      title: "city",
      name: "city",
      type: 'text'
    },
    {
        title: "sexe",
        name: "sexe",
        type: 'text'
    },
    {
      title: "phone_number",
      name: "phone",
      type: 'phone'
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((resp: any) => {
      if(resp.params.type == 'edit'){
        let indexPassword1 = -1;
        this.headers.map((elm, index) => {
          if(elm.name == 'password') indexPassword1 = index;
        });
        this.headers.splice(indexPassword1, 1);
        this.headers.splice(indexPassword1, 1);
      }

    })
  }

}
