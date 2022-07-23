import { API_URL } from './../common/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = API_URL + "orders/"

  constructor(private http: HttpClient) { }

  getOrder(orderId: number){
    return this.http.get(`${this.url}${orderId}`)
  }

}
