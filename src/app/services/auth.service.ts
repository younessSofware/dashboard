import { API_URL } from './../common/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, private router: Router) {
  }

  login(data: {email: string, password: string}){
    return this.http.post(API_URL + "login", data)
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
    return this.http.get(API_URL + "logout");
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  static getToken(): string | null{
    return localStorage.getItem('token')
  }

  loginByGoogle(data: any){
    return this.http.post(API_URL + 'socialLogin', data)
  }



}
