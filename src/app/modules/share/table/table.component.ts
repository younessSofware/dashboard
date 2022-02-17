import { API_URL } from './../../../common/constants';
import { NotificationService } from './../../../services/notification.service';
// import { NotificationService } from './../../services/notification.service';
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Header } from './../../../common/models/header';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

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

  @Input() headers: Header[] = [];
  @Input() icon = "";
  @Input() primaryKey: string;

  data: any[];
  pages: number[];
  error: string | undefined;
  success: string | null;

  currentPage = 1;
  limit = 1;
  searchQuery = "";
  sortBy: string;
  sortDir = 1;

  constructor(private dataService: DataService, private route: ActivatedRoute,
              private notification: NotificationService) {}

  ngOnInit(): void {
    this.sortBy = this.primaryKey;
    this.getQueryParams();
    this.getData();
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
          if(header.type == 'avatar'){
            this.data.forEach(data => {
              data[header.name] = API_URL + data[header.name];
            })
          }
        })
        const nbPages = Math.floor(resp.data.count / this.limit) + 1
        console.log(nbPages);
        this.pages = [...new Array(nbPages).keys()].map(key => key + 1);
      },
      error: err => {
        console.log("err", err);
        this.error = err.message;
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
      element = header.parents.reverse().reduce((acc, curr) => acc[curr], data)[header.name]

    if(!element) return header.default;
    if(type == 'boolean') return header.values ? header.values[element ? 1 : 0] : 0

    return element
  }

}
