// import { SocketService } from './../../../services/socket.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = {
    signin: false,
    socialLogin: false
  };
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

  constructor(private authService: AuthService, private router: Router,
    public afAuth: AngularFireAuth,) {

      this.afAuth.authState.subscribe((res: any) => {
        if (res) {
          this.loading.socialLogin = true;
          console.log(res);

          const user =  res.multiFactor.user;
          // user = {email, accessToken, uid}
          const data = {
            email: user.email,
            providerType: 'google',
            providerId: user.uid,
            name: user.displayName
          }
          this.loginByGoogle(data);
        } else {
          console.log(res);
        }
      }, err => {
        this.loading.socialLogin = false;
        console.log(err);
      });

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.form.patchValue({
      email: "admin@admin.com",
      password: "123456789"
    })
  }

  ngOnInit(): void {
  }

  loginByGoogle(data: any){
    this.authService.loginByGoogle(data).subscribe((resp: any) => {
      console.log(resp);
      this.loading.socialLogin = false;
      this.authService.setToken(resp.token);
      window.localStorage.setItem('user', JSON.stringify(resp.user));
      if(resp.user.role == 1){
        console.log(resp.newAccount);

        if(resp.newAccount){
          this.router.navigateByUrl('/dashboard/clients/form/edit');
          return;
        }else
          this.router.navigateByUrl('/dashboard/clients/display');
      }else if(resp.user.role == 0){
        this.router.navigateByUrl('/dashboard');
      }
    }, err => {
      this.loading.socialLogin = false;
      this.error = err

    })
  }

  submit(): void{
    this.loading.signin = true;
    this.error = '';

    this.authService.login(this.data)
    .subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.loading.signin = false;
        this.authService.setToken(resp.token);
        window.localStorage.setItem('user', JSON.stringify(resp.user));
        if(resp.user.role == 1){
          this.router.navigateByUrl('/dashboard/clients/display');
        }else if(resp.user.role == 0){
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: err => {
        this.loading.signin = false;
        this.error = err
      }
    })
  }
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      console.log(res);

    }).catch((err) => {
      console.log(err);
    });
  }
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);

      })
      .catch((error) => {
        console.log(error);
      });
  }
}
