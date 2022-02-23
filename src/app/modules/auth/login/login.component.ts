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

    this.form.patchValue({
      email: "admin@wabel.com",
      password: "12345678"
    })
  }

  ngOnInit(): void {
  }

  submit(): void{
    this.loading = true;
    this.error = '';

    this.authService.login(this.data)
    .subscribe({
      next: (resp: any) => {
        this.loading = false;
        const token = resp.data.accessToken;
        this.authService.setToken(token)

        const parsedToken = AuthService.parsedToken();

        const user = {
          id: parsedToken.sub,
          name: parsedToken.username
        }
        console.log(user);
        window.localStorage.setItem('user', JSON.stringify(user));
        this.router.navigateByUrl('/dashboard');
      },
      error: err => {
        this.loading = false;
        this.error = err
      }
    })
  }
}
