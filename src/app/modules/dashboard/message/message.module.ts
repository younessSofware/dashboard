import { ShareModule } from './../../share/share.module';
import { FormsModule } from '@angular/forms';
import { NgxHowlerService } from 'ngx-howler';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message.component';
import { AudioComponent } from './audio/audio.component';
import { SliderComponent } from './slider/slider.component';


@NgModule({
  declarations: [
    MessageComponent,
    AudioComponent,
    SliderComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    FormsModule,
    ShareModule
  ],
})
export class MessageModule { }
