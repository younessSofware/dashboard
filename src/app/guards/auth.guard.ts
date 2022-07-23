import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(): boolean {
    if (!window.localStorage.getItem('token')){
      this.router.navigateByUrl('/auth');
      return false;
    }
    const user = JSON.parse(localStorage.getItem('user') as string)
    return !!user;
  }
}
