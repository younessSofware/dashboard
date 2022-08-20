import { ServerMediaPipe } from './../../pipes/server-media.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { MsTimePipe } from './../../pipes/ms-time.pipe';
import { ResumeTextPipe } from './../../pipes/resume-text.pipe';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { DisplayComponent } from './display/display.component';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingLineComponent } from './loading-line/loading-line.component';
@NgModule({
  declarations: [
    AlertComponent,
    ResumeTextPipe,
    DisplayComponent,
    FormComponent,
    TableComponent,
    MsTimePipe,
    LoadingLineComponent,
    ServerMediaPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule,

  ],
  exports: [
    AlertComponent,
    DisplayComponent,
    FormComponent,
    TableComponent,
    MsTimePipe,
    LoadingLineComponent,
    ServerMediaPipe
  ]
})
export class ShareModule { }
