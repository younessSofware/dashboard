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
  @Input() showDeleteButton = true;
  @Input() showUpdateButton = true;
  @Input() showCreateButton = true;

  @Input() headers: Header[] = [];
  @Input() icon = "";

  data: any[];
  pages: number[];
  error: string | undefined;
  success: string | null;

  currentPage = 1;
  limit = 20;
  searchQuery = "";
  sortBy = "_id";
  sortDir = 1;

  constructor(private dataService: DataService, private route: ActivatedRoute,
              private notification: NotificationService) { }

  ngOnInit(): void {
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

  getData(){
    this.error = undefined;
    this.dataService.sendRequest('get', this.retrieveURL, {
      sortBy: this.sortBy,
      sortDir: this.sortDir,
      page: this.currentPage,
      limit: this.limit,
      searchQuery: this.searchQuery
    })?.subscribe({
      next: (resp: any) => {
        this.data = resp.data.docs;
        this.headers?.forEach(header => {
          if(header.type == 'avatar'){
            this.data.forEach(data => {
              data[header.name] = API_URL + data[header.name];
            })
          }
        })
        this.pages = [...new Array(resp.data.totalPages).keys()].map(key => key + 1);
      },
      error: err => {
        console.log(err);
        this.error = err.error;
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
          const deleteUrl = this.deleteURL.replace(/:id/g, row['_id'])
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
  //     const url = header.link.replace(/:id/g, d['_id'])
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
}
