import { Validators } from '@angular/forms';
import { FormHeader } from '../../../../common/models/form-header';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  headers: FormHeader[] ;
  categories: any;
  userId: number;
  user: any;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')as string);
    if(this.user.role == 1){
      this.userId = this.user.id
    }
    this.getCategories();
  }

  getCategories(){
    this.dataService.sendGetRequest('categories/sort/0', {})
    .subscribe({
      next: (resp: any) => {
        this.categories = resp;
        this.route.queryParams.subscribe((resp: any) => {
          if(resp.id){
            this.userId = parseInt(resp.id);
          }
          console.log(resp);

        this.initHeaders();
        })
      },
      error: err => {
        console.log(err);
      }
    })
  }

  initHeaders(){
    this.headers = [
      {
        name: "id",
        title: "id",
        hidden: true,
        value: ''
      },
      {
        name: "name",
        title: "name",
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
          options: this.categories,
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
      },
      {
        name: "date_from",
        title: "date_from",
        type: 'date',
        value: '',
        validators: [
          {
            validatorFn: Validators.required,
            message: 'date_required'
          }
        ]
      },
      {
        name: "date_to",
        title: "date_to",
        type: 'date',
        value: '',
      },
      {
        title: "details",
        name: "details",
        type: 'textarea',
        value: '',
      },
      {
        title: "location",
        name: "location",
        type: 'text',
        value: '',
      }
    ];
  }

}
