import { API_URL } from './../common/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static timer: any = null;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(data: {email: string, password: string}){
    return this.http.post(API_URL + "login", data)
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth')
  }

  setToken(token: string){
    localStorage.setItem('token', token);
    AuthService.logoutOnTokenExpired()
  }

  static getToken(): string | null{
    return localStorage.getItem('token')
  }

  static logoutOnTokenExpired(){
    if(this.timer) clearTimeout(this.timer)

    const token = this.parsedToken();
    if(token){
      const time = (token.exp - token.iat) * 1000
      this.timer = setTimeout(() => {
        localStorage.removeItem('token')
      }, time);
    }
  }

  static parsedToken(){
    const token = this.getToken() as string;
    if(token){
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload)
    }
    return null;
  }
}
