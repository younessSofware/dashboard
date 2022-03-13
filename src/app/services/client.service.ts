import { HttpClient } from '@angular/common/http';
import { API_URL } from './../common/constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = API_URL + "clients/";

  constructor(private http: HttpClient) { }

  client(id: number){
    return this.http.get(this.url + id)
  }

  orderStatistics(clientId: number){
    return this.http.get(`${this.url}${clientId}/orders-statistics`)
  }

  purchases(clientId: number){
    return this.http.get(`${this.url}${clientId}/purchases`)
  }

  orders(storeId: number, params: any){
    return this.http.get(`${this.url}${storeId}/orders`, {
      params
    })
  }

  clientsLocations(){
    return this.http.get(`${this.url}locations`)
  }

}
