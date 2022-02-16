import { Header } from './../../../../common/models/header';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  countries = {};
  currencies = {};
  headers: Header[] = [];
  error = false;

  constructor() { }

  ngOnInit(): void {
    // this.getJsonData();
  }

  // getJsonData(){
  //   this.jsonService.getCountries()
  //   .subscribe(resp => {
  //     this.countries = resp;
  //     this.jsonService.getCurrencies()
  //     .subscribe(resp => {
  //       this.currencies = resp;
  //       this.initializeHeaders();
  //     })
  //   }, err => this.showServerErorr());
  // }

  showServerError(){
    this.error = true
  }

  initializeHeaders(){
    this.headers = [
      {
        name: "photo",
        title: "",
        type: "image",
        value: ''
      },
      {
        name: "id",
        title: "id",
        hidden: true,
        value: ''
      },
      {
        name: "label",
        title: "label",
        type: 'text',
        value: ''
      },
      {
        name: "description",
        title: "description",
        type: 'textarea',
        value: ''
      },
      {
        name: "country",
        title: "country",
        type: 'select',
        width: '1/2',
        options: Object.keys(this.countries),
        value: Object.keys(this.countries)[0]
      },
      {
        name: "city",
        title: "city",
        type: 'select',
        width: '1/2',
        // options: this.countries[Object.keys(this.countries)[0]],
        // value: this.countries[Object.keys(this.countries)[0]][0]
      },
      {
        name: "price",
        title: "price",
        type: 'number',
        value: 0
      },
      {
        name: "currency",
        title: "currency",
        type: 'select',
        options: Object.keys(this.currencies),
        value: Object.keys(this.currencies)[0]
      },
      {
        name: "sold",
        title: "status",
        type: 'boolean',
        options: ['available', 'sold'],
        value: true,
      }
    ];
  }

  changeHeaders(headers: Header[]){
    this.headers = headers;
  }

  fieldChanged(event: any){
    if(event.name == 'country'){
      this.headers = this.headers.map(header => {
        if(header.name == 'city'){
          // header.options = this.countries[event.value];
          // header.value = this.countries[event.value][0];
        }
        return header;
      });
    }
  }
}
