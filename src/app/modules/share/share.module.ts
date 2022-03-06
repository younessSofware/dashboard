import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from 'ng-apexcharts';
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
import { RadialBarComponent } from './radial-bar/radial-bar.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LoadingLineComponent } from './loading-line/loading-line.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

@NgModule({
  declarations: [
    AlertComponent,
    ResumeTextPipe,
    DisplayComponent,
    FormComponent,
    TableComponent,
    MsTimePipe,
    RadialBarComponent,
    LineChartComponent,
    LoadingLineComponent,
    OrdersListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgApexchartsModule,
    TranslateModule
  ],
  exports: [
    AlertComponent,
    DisplayComponent,
    FormComponent,
    TableComponent,
    MsTimePipe,
    RadialBarComponent,
    LineChartComponent,
    LoadingLineComponent,
    OrdersListComponent
  ]
})
export class ShareModule { }
