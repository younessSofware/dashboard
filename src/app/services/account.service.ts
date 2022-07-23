import { API_URL } from './../common/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = API_URL + "accounts/";

  constructor(private http: HttpClient) { }

  enable(id: number){
    return this.http.put(`${ this.url }enable` , {
      ids: [id]
    })
  }

  block(id: number){
    return this.http.put(`${ this.url }block` , {
      ids: [id]
    })
  }

  suspend(id: number){
    return this.http.put(`${ this.url }suspend` , {
      ids: [id]
    })
  }
}
