import { FormHeader } from './../../../common/models/form-header';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from './../../../common/models/header';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {

  @Input() singleName: string;
  @Input() pluralName: string;

  @Input() retrieveURL: string;
  @Input() storeURL: string;
  @Input() updateURL: string;
  @Input() redirectLink: string;

  @Input() headers: FormHeader[] = [];
  @Input() icon = "";
  @Output() headersChanged = new EventEmitter();
  @Output() onChange = new EventEmitter();

  imagesUrl: any = {};
  errors: any;
  error: string | null;
  loading = true;
  saveLoading = false;
  type: string;
  dataId: string;
  data: any;
  form: FormGroup

  constructor(private sanitizer: DomSanitizer, private dataService: DataService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){
    const formgroup =
    this.headers.reduce((acc, curr) => ({
      ...acc,
      [curr.name]: new FormControl('', curr.validators?.map(v => v.validatorFn))
    }), {})
    console.log(formgroup);

    this.form = new FormGroup(formgroup
    )
  }

  formFieldErrors(header: FormHeader){
    const errors = Object.keys(this.formField(header.name)?.errors as {});
    return header.validators?.filter(v => errors.includes(v.validatorFn.name)).map(v => v.message);
  }

  formField(fieldName: string){
    return this.form.get(fieldName)
  }

  ngOnChanges(changes: SimpleChanges){
    if(!this.type && this.headers && this.headers.length) this.getFormType();
  }

  getFormType(){
    this.route.paramMap
    .subscribe(
      params => {
        const type = params.get('type');
        if(type) this.type = type
        if(type == 'edit'){
          this.route.queryParamMap
          .subscribe(
            query => {
              const id = query.get('id');
              if(id) this.dataId = id
              this.getData();
            }
          )
        }else this.loading = false;
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
        console.log(resp.data);
        this.setHeaderValues();
      },
      error: err => {
        err = err.error;
        this.loading = false;
        this.error = err;
        console.log(err);
      }
    })
  }

  setHeaderValues(){
    this.headersChanged.emit(this.headers.map(header => {
      this.fieldChanged(header.name, this.data[header.name])
      if(header.type == 'avatar' || header.type == 'image'){
        this.imagesUrl[header.name] = this.data[header.name];
        return header;
      }
      let value = this.data[header.name];
      return{
        ...header,
        value
      }
    }))
  }

  fieldChanged(name: string, value: any){
    this.onChange.emit({name, value});
  }

  addTag(header: Header, event: any){
    const value = event.target.value;
    if(!header.value.includes(value)) header.value.push(value);
  }

  removeTag(header: Header, tagInd: number){
    header.value.splice(tagInd, 1);
  }

  setImage(header: Header, $event: any){
    const image = $event.target.files[0];
    this.imagesUrl[header.name] = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(image));
    header.value = image;
  }

  getJsonData(){
    return this.headers.reduce((acc, curr) => ({...acc, [curr.name]: this.formField(curr.name)?.value}), {})
  }

  getFormData(){
    const formData = new FormData();
    this.headers.forEach(header => {
      switch (header.type) {
        case 'image':
        case 'avatar':{
          if(header.value){
            formData.append(header.name, header.value, 'image')
          }
          break;
        }
        case 'select-tags':
          formData.append(header.name, header.value);
          break;
        case 'input-list': {
          const list = header.value.filter((val: string) => val.length)
          formData.append(header.name, JSON.stringify(list));
          break;
        }

        default:
          formData.append(header.name, header.value)
          break;
      }
    })
    return formData;
  }

  beforeRequest(){
    this.error = null;
    this.errors = [];
    this.saveLoading = true;
  }

  handleResponse(resp: any){
    this.router.navigate([this.redirectLink], {
      queryParams: {
        flashMessage: resp.message
      }
    })
    this.saveLoading = false;
  }

  handleError(err: any){
    this.saveLoading = false;
    console.log("error ", err);
    if(err.message && err.message.length){
      this.errors = err.message.map((e: any) => ({property: e.property, errors: Object.keys(e.constraints).map(k => e.constraints[k]) }))
      .reduce((acc: any, curr: any) => ({...acc, [curr.property]: curr.errors}), {})
      this.error = "Invalid data";
    }
    else this.error = err.error;
    const timer = setInterval(() => {
      if(document.body.scrollTop) document.body.scrollTop = --document.documentElement.scrollTop;
      else clearInterval(timer)
    }, 10)
  }

  updateUser(){
    this.beforeRequest();
    const url = this.updateURL.replace(/:id/g, this.dataId);
    this.dataService.sendPutRequest(url, this.getFormData())
    .subscribe({
      next: resp => {
        this.handleResponse(resp);
      },
      error: err => {
        this.handleError(err)
      }
    })
  }

  trackByIndex(index: number): any {
    return index;
  }

  getRequestData(){
    return this.headers.filter(h => h.type == 'file' || h.type == 'photo').length ? this.getFormData() : this.getJsonData()
  }

  storeUser(){
    this.beforeRequest();
    console.log(this.getRequestData());
    this.dataService.sendPostRequest(this.storeURL, this.getRequestData())
    .subscribe({
      next: resp => {
        this.handleResponse(resp);
      },
      error: err => {
        this.handleError(err)
      }
    })
  }

  addElemToList(header: Header){
    header.value.push('');
  }

  removeElemFromList(header: Header, ind: number){
    header.value.splice(ind, 1);
  }

}
