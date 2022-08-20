import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean {
    if (!window.localStorage.getItem('token')){
      this.router.navigateByUrl('/auth');
      return false;
    }
    const user = JSON.parse(localStorage.getItem('user') as string)
    if(user.role == 1){
      this.router.navigateByUrl('/dashboard/clients/display');
      return false;
    }
    return !!user;
  }
}
