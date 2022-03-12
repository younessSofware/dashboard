import { API_URL } from './../common/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  url = API_URL + "stores/"

  constructor(private http: HttpClient) { }

  store(id: number){
    return this.http.get(this.url + id)
  }

  products(storeId: number, params: any){
    return this.http.get(`${this.url}${storeId}/products`, {
      params
    })
  }

  deliveryMen(storeId: number, params: any){
    return this.http.get(`${this.url}${storeId}/delivery-men`, {
      params
    })
  }

  orderStatistics(storeId: number){
    return this.http.get(`${this.url}${storeId}/orders-statistics`)
  }

  stores(){
    return this.http.get(this.url)
  }

  sales(storeId: number){
    return this.http.get(`${this.url}${storeId}/store-sells`)
  }

  orders(storeId: number, params: any){
    return this.http.get(`${this.url}${storeId}/orders`, {
      params
    })
  }

  storesLocations(){
    return this.http.get(`${this.url}locations`)
  }
}
