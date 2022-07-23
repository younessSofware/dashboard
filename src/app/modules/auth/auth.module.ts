import { ToastrModule } from 'ngx-toastr';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { ShareModule } from './../share/share.module';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    ShareModule
  ],
})
export class AuthModule { }