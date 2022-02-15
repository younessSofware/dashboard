import { ResumeTextPipe } from './../../pipes/resume-text.pipe';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { DisplayComponent } from './display/display.component';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlertComponent,
    ResumeTextPipe,
    DisplayComponent,
    FormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    AlertComponent,
    DisplayComponent,
    FormComponent,
    TableComponent
  ]
})
export class ShareModule { }
