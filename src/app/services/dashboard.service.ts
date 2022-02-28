import { AccountRole } from './../common/models/enums/account-role';
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

  getCategories(){
    return this.http.get(`${API_URL}categories`)
  }


  getMessages(userId: number, params: {skip: number, take: number}){
    return this.http.get(`${API_URL}messages/${userId}`, {
      params
    })
  }

  getCorrespondents(role: AccountRole){
    return this.http.get(`${API_URL}messages/correspondents`, {
      params: {
        role
      }
    })
  }

}
