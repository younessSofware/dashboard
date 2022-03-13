import { API_URL } from './../common/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryMenService {

  url = API_URL + 'delivery-men/'

  constructor(private http: HttpClient) { }

  deliveryMan(id: number){
    return this.http.get(this.url + id)
  }

  orders(id: number, params: any){
    return this.http.get(`${this.url}${id}/orders`, {
      params
    })
  }

  orderStatistics(id: number){
    return this.http.get(`${this.url}${id}/orders-statistics`)
  }

  deliveryMenLocations(){
    return this.http.get(`${this.url}locations`)
  }

}
