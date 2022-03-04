import { SocketService } from './../../../services/socket.service';
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

  get phoneNumber(){
    return this.form.get('phoneNumber')
  }

  get password(){
    return this.form.get('password')
  }

  get data(){
    return {
      phoneNumber: this.phoneNumber?.value,
      password:  this.password?.value
    }
  }

  constructor(private authService: AuthService, private router: Router, private socketService: SocketService) {
    this.form = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    this.form.patchValue({
      phoneNumber: "+212658426577",
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

        this.socketService.connect();

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
