import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    console.log("token", token);

    if (token){
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
}
