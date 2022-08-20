import { FormHeader } from './../../../../common/models/form-header';
import { Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  classes = [{
    id: 1,
    name: 'مقال'
  },{
    id: 2,
    name: 'حدث'
  }]
  headers: FormHeader[] = [
    {
      name: "id",
      title: "id",
      hidden: true,
      value: ''
    },
    {
      name: "name",
      title: "category_name",
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
      name: "type",
      title: "category_type",
      type: 'select',
      selectOptions: {
        options: this.classes,
        valueProperty: 'name',
        nameProperty: 'name'
      },
      value: '',
      validators: [
        {
          validatorFn: Validators.required,
          message: 'name_required'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
