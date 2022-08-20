import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormHeader } from 'src/app/common/models/form-header';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss']
})
export class NotificationFormComponent implements OnInit {
  listDisplays = [{
    id: 1,
    name: 'ظاهر'
  },{
    id: 2,
    name: 'غبر ظاهر'
  }];
  headers: FormHeader[] = [
    {
      name: "id",
      title: "id",
      hidden: true,
      value: ''
    },
    {
      name: "background_color",
      title: "background_color",
      type: 'color',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'background_color_required'
        }
      ]
    },
    {
      name: "limit_color",
      title: "limit_color",
      type: 'color',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'limit_color_required'
        }
      ]
    },
    {
      name: "display",
      title: "display",
      type: 'select',
      selectOptions: {
        options: this.listDisplays,
        valueProperty: 'name',
        nameProperty: 'name'
      },
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'display_required'
        }
      ]
    },
    {
      name: "text_color",
      title: "text_color",
      type: 'color',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'text_color_required'
        }
      ]
    },
    {
      name: "text_size",
      title: "text_size",
      type: 'number',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'text_size_required'
        }
      ]
    },
    {
      title: "link",
      name: "link",
      type: 'text',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'link_required'
        }
      ]
    },
    {
      title: "texte",
      name: "texte",
      type: 'textarea',
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'texte_required'
        }
      ]
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
