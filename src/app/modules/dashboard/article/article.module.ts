import { TranslateModule } from '@ngx-translate/core';
import { ShareModule } from '../../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleComponent } from './article.component';
import { ArticleDisplayComponent } from './article-display/article-display.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';


@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleFormComponent,
    ArticleDisplayComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ShareModule,
    TranslateModule
  ]
})
export class ArticleModule { }
