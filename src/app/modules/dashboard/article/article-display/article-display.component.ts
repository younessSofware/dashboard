import { TranslateService } from '@ngx-translate/core';
import { DOMAIN_URL } from '../../../../common/constants';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-articel-display',
  templateUrl: './article-display.component.html',
  styleUrls: ['./article-display.component.scss']
})
export class ArticleDisplayComponent implements OnInit {


  articleld: any;
  article: any;
  articleError: any;



  get articleSearchQuery(){
    return encodeURIComponent(JSON.stringify({
      article: {
        id: this.articleld
      }
    }))
  }

  constructor(private route: ActivatedRoute, private dataService: DataService, private translateService: TranslateService,) { }

  async ngOnInit() {
    this.getDataId();
  }


  monthBefore () {
    const date = new Date()
    return [...new Array(31).keys()].map((e, ind) => {
      if(ind) date.setDate(date.getDate() - 1)
      return date.getDate() + ' ' + date.toString().slice(4, 7)
    }).reverse()
  }

  getDataId(){
    this.route.queryParamMap
    .subscribe(
      query => {
        const id = query.get('id');
        if(id) this.articleld = +id
        this.getArticle();
      }
    )
  }

  getArticle(){
    this.dataService.sendGetRequest('articles' + '/' + this.articleld, {})
    .subscribe({
      next: (resp: any) => {
        this.article = resp;
        console.log(resp);
      },
      error: err => {
        this.articleError = err;
      }
    })
  }


  image(){
    if(this.article) return DOMAIN_URL + this.article.image;
    return null;
  }
}
