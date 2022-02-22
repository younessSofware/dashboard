import { Button } from './../../../common/models/button';
import { API_URL, DOMAIN_URL } from './../../../common/constants';
import { NotificationService } from './../../../services/notification.service';
// import { NotificationService } from './../../services/notification.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Header } from './../../../common/models/header';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() singleName: string;
  @Input() pluralName: string;

  @Input() retrieveURL: string;
  @Input() deleteURL: string;
  @Input() displayLink: string;
  @Input() editLink: string;
  @Input() createLink: string;
  @Input() showSortFilter = true;
  @Input() showDeleteButton = true;
  @Input() showUpdateButton = true;
  @Input() showCreateButton = true;
  @Input() showDisplayButton = true;

  @Input() headers: Header[] = [];
  @Input() buttons: Button[] = [];
  @Input() icon = "";
  @Input() primaryKey: string;

  data: any[];
  pages: number[];
  error: string | undefined;
  success: string | null;
  displayedButtons: Button[];
  defaultButtons: any = {};

  currentPage = 1;
  limit = 20;
  searchQuery = "";
  sortBy: string;
  sortDir = 1;

  constructor(private dataService: DataService, private route: ActivatedRoute,
              private notification: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.sortBy = this.primaryKey;
    this.getQueryParams();
    this.getData();
    this.defaultButtons = {
      display: {
        name: 'display',
        icon: 'fas fa-eye',
        color: 'blue',
        routerLink: {
          link: this.displayLink,
          query: {id: ':id'}
        }
      },
      edit: {
        name: 'edit',
        icon: 'fas fa-edit',
        color: 'blue',
        routerLink: {
          link: this.editLink,
          query: {id: ':id'}
        }
      },
      delete: {
        name: 'delete',
        icon: 'fas fa-trash-alt',
        color: 'blue',
        request: {
          url: this.deleteURL,
          method: 'delete'
        },
        confirmation: {
          title: 'Delete ' + this.singleName,
          text: 'Are you sure you want to delete this ' + this.singleName,
          confirmButtonText: 'Yes',
          confirmButtonColor: 'red',
          showCancelButton: true,
          cancelButtonText: 'No',
          icon: 'warning'
        }
      }
    }
    this.initButtons();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(Object.keys(this.defaultButtons).length){
        if(changes['editLink']) this.defaultButtons['edit'].routerLink.link = this.editLink
        if(changes['displayLink']) this.defaultButtons['display'].routerLink.link = this.displayLink
        if(changes['deleteURL']) this.defaultButtons['delete'].request.url = this.deleteURL
      }
      if(changes['buttons']) this.initButtons();
  }

  initButtons(){
    this.displayedButtons = [
      ...this.buttons,
      ...Object.keys(this.defaultButtons).map(k => this.defaultButtons[k])
    ]
  }

  getQueryParams(){
    this.route.queryParamMap
    .subscribe(
      query => {
        const flashMessage = query.get('flashMessage')
        if(flashMessage){
          this.success = flashMessage;
          setTimeout(() => {
            this.success = null;
          }, 2000);
        }
      },
    )
  }

  canNext(): boolean{
    return this.pages && this.currentPage < this.pages.length || false;
  }

  canPrevious(): boolean{
    return this.pages && this.currentPage > 1 || false;
  }

  nextPage(){
    if(this.canNext()) {
      this.currentPage++;
      this.getData();
    }
  }

  previousPage(){
    if(this.canPrevious()){
      this.currentPage--;
      this.getData();
    }
  }

  filterQuery(){
    const query: any = {
      skip:(this.currentPage - 1) * this.limit,
      take: this.limit,
      searchQuery: this.searchQuery
    }
    if(this.showSortFilter){
      query["sortBy"] = this.sortBy
      query["sortDir"] = this.sortBy
    }
    return query;
  }

  getData(){
    this.error = undefined;
    this.dataService.sendGetRequest(this.retrieveURL, this.filterQuery())?.subscribe({
      next: (resp: any) => {
        this.data = resp.data[this.pluralName];
        this.headers?.forEach(header => {
          if(header.type == 'image'){
            this.data.forEach(data => {
              data[header.name] = DOMAIN_URL + "/" + data[header.name];
            })
          }
        })
        const nbPages = Math.floor(resp.data.count / this.limit) + 1
        this.pages = [...new Array(nbPages - 1).keys()].map(key => key + 1);
      },
      error: err => {
        console.log("err", err);
        this.error = err;
      }
    })
  }

  showDeleteConf(){
    return Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete this ${this.singleName} !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      confirmButtonText: 'Yes, delete it!'
    })
  }

  deleteRow(row: any, ind: number){
    this.showDeleteConf()
    .then(
      resp => {
        if(resp.isConfirmed){
          const deleteUrl = this.deleteURL.replace(/:id/g, row[this.primaryKey])
          this.dataService.sendDeleteRequest(deleteUrl)
          .subscribe({
            next: (resp: any) => {
              console.log(resp);
              this.data.splice(ind, 1);
              this.showSuccessMessage(resp.message);
            },
            error: err => {
              console.log(err);
              this.showErrorMessage(err.error);
            }
         })
        }
      }
    )
  }

  showErrorMessage(message: string){
    this.notification.showSuccess(message, 'Error');
  }

  showSuccessMessage(message: string){
    this.notification.showSuccess(message, 'Success');
  }

  // toggle(header, d){
  //   if(header.link){
  //     const url = header.link.replace(/:id/g, d[this.primaryKey])
  //     this.dataService.sendPostRequest(url, {})
  //     .subscribe(
  //       (resp: any) => {
  //        d[header.name] = resp.data;
  //         this.showSuccessMessage(resp.message);
  //       },
  //       err => {
  //         err = err.error;
  //         this.showErrorMessage(err);
  //       }
  //     )
  //   }
  // }

  sortableHeaders(){
    return this.headers?.filter(header => header.sort != false)
  }

  getHeaderValue(data: any, header: Header, type: string | undefined){
    let element = data[header.name]
    if(header.parents?.length)
      element = header.parents.reduce((acc, curr) => {
        return acc[curr]
      }, data)[header.name]

    if(!element) return header.default;
    if(type == 'boolean') return header.values ? header.values[element ? 1 : 0] : 0

    return element
  }


  showConf(button: Button){
    if(!button.confirmation) return;
    return Swal.fire(button.confirmation)
  }

  handleButtonEvent(button: Button, data: any){
    console.log(button);
    if(button.confirmation){
      this.showConf(button)
      ?.then(
        (res: any) => {
          if(res.isConfirmed){
            if(typeof res.value == 'string'){
              this.redirectBtnEvent(button, data, {});
            }
            else this.redirectBtnEvent(button, data);
          }
        }
      )
    }else this.redirectBtnEvent(button, data);
  }

  redirectBtnEvent(button: Button, data: any, requestData = {}){
    button.request ? this.doRequest(button, data, requestData) : this.navigateBtn(button, data);
  }

  parsePath(path: string, data: any){
    return path.split(':').map((e: string, ind: number) => {
      if(!ind) return e;
      const arr = e.split('/');
      return this.parseStrDataAttr(arr[0], data) + '/' + arr.slice(1).join('/')
    }).join('')
  }

  parseStrDataAttr(attr: string, data: any){
    return attr.split('.').reduce((acc, curr) => acc[curr], data);
  }

  navigateBtn(button: Button, data: any){
    let link: any = button.routerLink?.link;
    link = this.parsePath(link, data);

    const query = button.routerLink?.query;

    if(query) Object.keys(query).forEach(k => {if(query[k].charAt(0) == ':') query[k] = this.parseStrDataAttr(query[k].slice(1), data)})

    this.router.navigate([link], {
      queryParams: query
    })
  }

  doRequest(button: Button, data: any, requestData = {}){
    if(!button.request) return;
    const url = button.request.url

    this.dataService.sendRequest(button.request.method, this.parsePath(url, data), requestData)
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

}
