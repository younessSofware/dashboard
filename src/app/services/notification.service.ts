import { HttpClient } from '@angular/common/http';
import { API_URL } from './../common/constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = API_URL + 'notifications/'

  constructor(private http: HttpClient) { }

  getNotifications(){
    return this.http.get(`${API_URL}notifications`)
  }

  markAsSeen(id: number){
    return this.http.put(`${API_URL}notifications/${id}/seen`, {})
  }

  accept(id: number){
    return this.http.put(`${API_URL}notifications/${id}/accept`, {})
  }

  reject(id: number){
    return this.http.put(`${API_URL}notifications/${id}/reject`, {})
  }

  count(){
    return this.http.get(`${API_URL}notifications/count`)
  }
}
