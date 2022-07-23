import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = API_URL + "categories/";
  
  constructor(private http: HttpClient) { }

  getCategories(){
    return this.http.get(`${ this.url }`)
  }
}
