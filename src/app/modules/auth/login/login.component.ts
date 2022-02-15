import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  errors: any = null;
  error = '';
  form: FormGroup;

  get email(){
    return this.form.get('email')
  }

  get password(){
    return this.form.get('password')
  }

  get data(){
    return {
      email: this.email?.value,
      password:  this.password?.value
    }
  }

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required,  Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  parseJwt(token: string){
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload)
  }

  submit(): void{
    this.loading = true;
    this.error = '';

    this.authService.login(this.data)
    .subscribe({
      next: (resp: any) => {
        this.loading = false;
        const token = resp.data.accessToken;
        window.localStorage.setItem('token', token);
        const parsedToken = this.parseJwt(token);
        const user = {
          id: parsedToken.sub,
          name: parsedToken.username
        }
        console.log(user);
        window.localStorage.setItem('user', JSON.stringify(user));
        // this.router.navigateByUrl('/dashboard');
      },
      error: err => {
        console.log(err);
        const error = err.error;
        this.error = error.message
        this.loading = false;
      }
    })
  }
}
