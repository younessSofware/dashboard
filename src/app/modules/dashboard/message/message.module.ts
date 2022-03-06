import { ShareModule } from './../../share/share.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message.component';
import { AudioComponent } from './audio/audio.component';
import { AudioSliderComponent } from './audio/audio-slider/audio-slider.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessagesAreaComponent } from './messages-area/messages-area.component';
import { CorrespondentsListComponent } from './correspondents-list/correspondents-list.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    MessageComponent,
    AudioComponent,
    AudioSliderComponent,
    MessageBoxComponent,
    MessagesAreaComponent,
    CorrespondentsListComponent,
    MessageFormComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    FormsModule,
    ShareModule,
    TranslateModule
  ],
})
export class MessageModule { }
