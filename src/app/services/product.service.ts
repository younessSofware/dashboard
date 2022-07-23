import { API_URL } from './../common/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = API_URL + "products/"

  constructor(private http: HttpClient) { }

  getProduct(id: number){
    return this.http.get(`${this.url}${id}`)
  }

  sales(productId: number){
    return this.http.get(`${this.url}${productId}/sells`)
  }

  offers(productId: number){
    return this.http.get(`${this.url}${productId}/offers`)
  }
}
