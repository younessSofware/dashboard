import Swal from 'sweetalert2';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/common/models/list';
import { NotificationService } from 'src/app/services/notification.service';
import { Header } from './../../../common/models/header';
import { Button } from 'src/app/common/models/button';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})

export class DisplayComponent implements OnInit {

  @Input() singleName: string;
  @Input() icon: string;
  @Input() deleteURL: string;
  @Input() headers: Header[] = [];
  @Input() retrieveURL: string;
  @Input() redirectURL: string;
  @Input() buttons: Button[] = [];
  @Input() list: List | null = null;

  data: any;
  loading = false;
  dataId: string;
  error: string | null;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.getDataId();
  }

  getDataId(){
    this.route.queryParamMap
    .subscribe(
      query => {
        const id = query.get('id');
        if(id) this.dataId = id
        this.getData();
      }
    )
  }

  getData(){
    const url = this.retrieveURL.replace(/:id/g, this.dataId);
    this.error = null;
    this.dataService.sendGetRequest(url, {})
    .subscribe({
      next: (resp: any) => {
        this.loading = false;
        this.data = resp.data;
        console.log(this.data);

      },
      error: err => {
        err = err.error;
        this.loading = false;
        this.error = err;
      }
    })
  }

  showErrorMessage(message: string){
    this.notification.showError(message, 'Error');
  }

  showSuccessMessage(message: string){
    this.notification.showSuccess(message, 'Success');
  }

  showConf(button: Button){
    if(!button.confirmation) return;
    return Swal.fire(button.confirmation)
  }

  handleBtn(button: Button){
    if(button.confirmation){
      this.showConf(button)
      ?.then(
        (res: any) => {
          if(res.isConfirmed){
            if(typeof res.value == 'string'){
              const data = {};
              // if(button.confirmation?.inputAttributes) data[button.confirmation.inputAttributes.name] = res.value;
              this.btnGuideEvent(button, data);
            }
            else this.btnGuideEvent(button);
          }
        }
      )
    }else this.btnGuideEvent(button);
  }

  btnGuideEvent(button: Button, data = {}){
    button.request ? this.doRequest(button, data) : this.navigateBtn(button)
  }

  navigateBtn(button: Button){
    const link = button.routerLink?.link.replace(/:id/g, this.dataId) as string
    this.router.navigateByUrl(link)
  }

  doRequest(button: Button, data = {}){
    if(!button.request) return;
    const url = button.request.url.replace(/:id/g, this.dataId)
    this.dataService.sendRequest(button.request.method, url, data)
    ?.subscribe({
      next: (resp: any) => {
        if(button.request && button.request.redirectURL)
          this.router.navigateByUrl(button.request.redirectURL)

        this.getData();
        this.showSuccessMessage(resp.message);
      },
      error: err => {
        this.showErrorMessage(err.error);
      }
    })
  }

  navigateToLink(header: Header){
    const link = header?.link?.split(':');
    if(link) this.router.navigateByUrl(link.map((el, ind) => ind % 2 ? this.data[el] : el).join(''))
  }

  listNavigateToLink(button: Button, data: any){
    const link = button?.routerLink?.link.split(':');
    if(link) this.router.navigateByUrl(link.map((el, ind) => ind % 2 ? data[el] : el).join(''))
  }

  allowToShowBtn(button: Button): boolean{
    if(button.condition){
      const inverse = button.condition.includes('!')
      const elem = button.condition.replace('!', '')
      return inverse ? !this.data[elem] : this.data[elem]
    }else {
      return true;
    }
  }

  getHeaderValue(header: Header){
    console.log(this.data);

    let value = this.data[header.name]
    if(header.parents) value = header.parents.reverse().reduce((acc, curr) => acc[curr], this.data)[header.name]
    if(!value) value = header.default;
    return value;
  }
}
