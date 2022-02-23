import { API_URL } from './../common/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  statistics(){
    return this.http.get(API_URL + 'statistics');
  }

  getStore(id: number){
    return this.http.get(API_URL + "stores/" + id)
  }

  getStoreProducts(storeId: number, params: any){
    return this.http.get(`${API_URL}stores/${storeId}/products`, {
      params
    })
  }

  orderStatistics(storeId: number){
    return this.http.get(`${API_URL}stores/${storeId}/orders-statistics`)
  }

  getCategories(){
    return this.http.get(`${API_URL}categories`)
  }

  getStores(){
    return this.http.get(`${API_URL}stores`)
  }

  getMessages(userId: number, params: {skip: number, take: number}){
    return this.http.get(`${API_URL}messages/${userId}`, {
      params
    })
  }
  getCorrespondents(){
    return this.http.get(`${API_URL}messages/correspondents`)
  }
}
