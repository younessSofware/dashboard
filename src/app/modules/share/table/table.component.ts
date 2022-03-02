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
  @Input() rowButtons: Button[] = [];
  @Input() tableButtons: Button[] = [];
  @Input() icon = "";
  @Input() primaryKey: string;

  checkedRows: any[] = [];

  data: any[];
  pages: number[];
  error: string | undefined;
  success: string | null;
  displayedButtons: Button[];
  defaultButtons: any = {};

  currentPage = 1;
  limit = 20;
  searchQuery: any = {};
  sortBy: string;
  sortDir = 1;

  get searchHeaders(){
    return this.headers.filter(h => h.search)
  }

  get tableHeaders(){
    return this.headers.filter(h => h.type != 'hidden')
  }

  constructor(private dataService: DataService, private route: ActivatedRoute,
              private notification: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.sortBy = this.primaryKey;
    this.getQueryParams();
    this.getData();
    this.initSearchQueryObject();
    this.initDefaultButtons();
    this.initButtons();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(Object.keys(this.defaultButtons).length){
        if(changes['editLink']) this.defaultButtons['edit'].routerLink.link = this.editLink
        if(changes['displayLink'] && this.defaultButtons['display']) this.defaultButtons['display'].routerLink.link = this.displayLink
        if(changes['deleteURL']) this.defaultButtons['delete'].request.url = this.deleteURL
      }
      if(changes['showDisplayButton'] && !this.showDisplayButton) this.initDefaultButtons()
  }

  getSearchHeaderValue(header: Header){
    if(!header.parents || !header.parents.length) return this.searchQuery[header.name]
    return header.parents.reduce((acc, curr) => acc[curr], this.searchQuery)[header.name]
  }

  setSearchHeaderValue(header: Header, event: any){
    const value = event.target.value;
    if(!header.parents || !header.parents.length) this.searchQuery[header.name] = value;
    else header.parents.reduce((acc, curr) => acc[curr], this.searchQuery)[header.name] = value;
  }

  initSearchQueryObject(){
    this.searchHeaders.forEach(header => {
      if(header.parents && header.parents.length){
        const field = header.parents.reduce((acc, curr) => {
          if(!acc[curr]) acc[curr] = {};
          return acc[curr]
        }, this.searchQuery)

        if(!field[header.name]) field[header.name] = ''
      }
      else this.searchQuery[header.name] = ''
    })
  }

  refreshSearchQuery(){
    this.searchHeaders.forEach(header => {
      if(header.parents && header.parents.length){
        header.parents.reduce((acc, curr) => {
          if(!acc[curr]) acc[curr] = {};
          return acc[curr]
        }, this.searchQuery)[header.name] = ''
      }
      else this.searchQuery[header.name] = ''
    })
  }

  initDefaultButtons(){
    if(this.showDisplayButton) this.defaultButtons['display'] = {
      name: 'display',
      icon: 'fas fa-eye',
      color: 'blue',
      routerLink: {
        link: this.displayLink,
        query: {id: ':id'}
      }
    }
    this.defaultButtons['edit'] = {
      name: 'edit',
      icon: 'fas fa-edit',
      color: 'blue',
      routerLink: {
        link: this.editLink,
        query: {id: ':id'}
      }
    }
    this.defaultButtons['delete'] = {
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

  initButtons(){
    this.displayedButtons = [
      ...this.rowButtons,
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
        let searchQuery = query.get('searchQuery')
        if(searchQuery){
          searchQuery = JSON.parse(decodeURIComponent(searchQuery))
          this.searchQuery = searchQuery;
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
    const encodedSearchQuery = encodeURIComponent(JSON.stringify(this.searchQuery))

    const query: any = {
      skip:(this.currentPage - 1) * this.limit,
      take: this.limit,
      searchQuery: encodedSearchQuery
    }
    if(this.showSortFilter){
      query["sortBy"] = this.sortBy
      query["sortDir"] = this.sortBy
    }
    return query;
  }

  refresh(){
    this.refreshSearchQuery();
    this.getData();
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
    button.request ? (data ? this.doRequest(button, data, requestData) : this.doGlobalRequest(button)) : this.navigateBtn(button, data);
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

  doGlobalRequest(button: Button){
    if(!button.request) return;
    const url = button.request.url
    const ids = this.checkedRows.map(el =>
      this.parseStrDataAttr(button.dataField ? button.dataField : '', this.data.find(d => d[this.primaryKey] == el))
    )
    console.log(ids);
    this.dataService.sendRequest(button.request.method, url, {
      ids
    })
    ?.subscribe({
      next: (resp: any) => {
        if(button.request && button.request.redirectURL)
          this.router.navigateByUrl(button.request.redirectURL)

        this.checkedRows = [];
        this.getData();
        console.log(resp.message);

        this.showSuccessMessage(resp.message);
      },
      error: err => {
        this.showErrorMessage(err.error);
      }
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

  allowToShowBtn(button: Button, data: any): boolean{
    if(button.condition){
      const inverse = button.condition.includes('!')
      const elem = button.condition.replace('!', '')
      const res = elem.split('.').reduce((acc, curr) => acc[curr], data)
      console.log("----", res);

      return inverse ? !res : res
    }else {
      return true;
    }
  }

  checkRow(event: any, data: any){
    if(event.target.checked){
      this.checkedRows.push(data[this.primaryKey])
    }else{
      this.checkedRows.splice(this.checkedRows.indexOf(data[this.primaryKey]), 1)
    }
    console.log(this.checkedRows);
  }

  checkAllRows(event: any){
    if(event.target.checked){
      this.data.forEach(d => this.checkedRows.push(d[this.primaryKey]))
    }else{
      this.data.forEach(d => this.checkedRows.splice(this.checkedRows.indexOf(d[this.primaryKey]), 1))
    }
    console.log(this.checkedRows);
  }

}
