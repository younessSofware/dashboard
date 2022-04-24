import { AddressService } from './../../../services/address.service';
import { DOMAIN_URL } from './../../../common/constants';
import { FormHeader } from './../../../common/models/form-header';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Header } from './../../../common/models/header';
import { DataService } from 'src/app/services/data.service';
import * as Leaflet from 'leaflet';
import * as _ from "lodash"
import { switchMap, map as rxjsMap} from 'rxjs';

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
  form: FormGroup;
  maps: any;

  constructor(private sanitizer: DomSanitizer, private dataService: DataService, private router: Router,
              private route: ActivatedRoute, private addressService: AddressService) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['headers']){
      this.createForm();
      setTimeout(() => {
        this.initMaps();
      }, 1000)
    }
    if(!this.type && this.headers && this.headers.length){
      this.getFormType();
    }
  }

  createForm(){
    const formGroup = this.headers.reduce((acc, curr) => ({
      ...acc,
      [this.getFullHeaderName(curr)]: new FormControl('', curr.validators?.map(v => v.validatorFn))
    }), {})
    this.form = new FormGroup(formGroup)
  }

  formFieldErrors(header: FormHeader){
    const errors = Object.keys(this.formField(header)?.errors as {});
    return header.validators?.filter(v => errors.includes(v.validatorFn.name)).map(v => v.message);
  }

  formField(header: Header){
    return this.form.get(this.getFullHeaderName(header))
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
        this.setFormValues();
      },
      error: err => {
        err = err.error;
        this.loading = false;
        this.error = err;
        console.log(err);
      }
    })
  }

  setFormValues(){
    const form = {
      ...this.headers.map(h => {
        let value = h.parents ? [...h.parents].reduce((acc, curr) => acc[curr], this.data)[h.name] : this.data[h.name]
        if(h.selectOptions && h.type == 'select') value = value[h.selectOptions?.valueProperty]
        return {
          name: this.getFullHeaderName(h),
          value
        }
      }).reduce((acc, curr) => ({...acc, [curr.name]: curr.value}), {})
    }
    this.form.patchValue(form);
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

  getImage(header: FormHeader){
    if(this.imagesUrl[header.name]) return this.imagesUrl[header.name];

    const formValue =this.formField(header)?.value
    if(formValue) return  DOMAIN_URL + "/" + formValue;

    return './../../../assets/default-img.png'
  }

  capitalize(text: string){
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  getFullHeaderName(header: Header){
    return header.parents ? [...header.parents].reverse()
                            .reduce((acc, curr) => acc + (acc ? this.capitalize(curr) : curr), '') + this.capitalize(header.name)
                          : header.name
  }

  getJsonData(){
    console.log("***************");

    return this.headers.reduce((acc, curr) => {
      let field;
      if(curr.type == 'map') field = {
        [curr.name]: this.maps[this.getFullHeaderName(curr)]['address'],
        stringAddress: this.maps[this.getFullHeaderName(curr)]['stringAddress'],
        longitude: this.maps[this.getFullHeaderName(curr)]['longitude'],
        latitude: this.maps[this.getFullHeaderName(curr)]['latitude']
      }
      else {
        field = {[curr.name]: this.formField(curr)?.value}

      }

      if(curr.parents){
        field = curr.parents.reduce((acc1, curr1) => ({[curr1]: acc1}), field)
      }
      console.log("--------------");
      console.log(curr);
      console.log(acc);
      console.log(field);
      console.log("--------------");


      return _.merge(field, acc)
    }, {})
  }

  getFormData(){
    const formData = new FormData();
    this.headers.forEach(header => {
      const value = this.formField(header)?.value;
      switch (header.type) {
        case 'image':{
          if(header.value){
            formData.append(header.name, header.value, 'image')
          }
          break;
        }
        case 'select-tags':
          formData.append(header.name, value);
          break;
        case 'input-list': {
          const list = value.filter((val: string) => val.length)
          formData.append(header.name, JSON.stringify(list));
          break;
        }

        default:{
          const name = !header.parents ? header.name : [...header.parents].reverse().reduce((acc, curr) => `${curr}[${acc}]`  , header.name);
          formData.append(name, value ? value : '')
          break;
        }
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

    if(err.message){
      this.errors =err.message
      this.error = "invalid_data";
    }
    else this.error = err;

    const timer = setInterval(() => {
      if(document.body.scrollTop) document.body.scrollTop = --document.documentElement.scrollTop;
      else clearInterval(timer)
    }, 10)
  }

  updateData(){
    this.beforeRequest();
    console.log("request: ", this.getRequestData());
    this.dataService.sendPutRequest(this.updateURL, this.getRequestData())
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
    return this.headers.filter(h => h.type == 'image').length ? this.getFormData() : this.getJsonData()
  }

  storeData(){
    this.beforeRequest();
    console.log("request: ", this.getRequestData());
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

  initMaps(){
    this.headers.forEach(header => {
      if(header.type == 'map') this.initMap(this.getFullHeaderName(header));
    })
  }

  initMap(id: string){
    const map = Leaflet.map(id, {
      center: [ 23.7294493, 46.2676419 ],
      zoom: 2,
      maxBoundsViscosity: 1
    });

    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    map.on('click', (e: any) => {
      const latitude = e.latlng.lat;
      const longitude = e.latlng.lng;

      this.maps[id]['loading'] = true;

      this.addressService.getAddress(latitude, longitude, 'ar').pipe(
        switchMap((arAddress: any) => this.addressService.getAddress(latitude, longitude, 'en').pipe(
          rxjsMap((enAddress: any) => ({
            arAddress: arAddress.address,
            enAddress: enAddress
          }))
        ))
      ).subscribe({
        next: ({ arAddress, enAddress }: any) => {
          this.maps[id]['loading'] = false;
          if(arAddress) this.maps[id]['stringAddress'] = `${ arAddress.country ? ' ' + arAddress.country : '' }${ arAddress.state ? ' ,' + arAddress.state : '' }${ arAddress.state_district ? ' ,' + arAddress.state_district : '' }${ arAddress.region ? ' ,' + arAddress.region : ''}${ arAddress.province ? ' ,' + arAddress.province : ''}${ arAddress.city ? ' ,' + arAddress.city : '' }${ arAddress.village ? ' ,' + arAddress.village : '' }${ arAddress.town ? ' ,' + arAddress.town : '' }`;
          if(enAddress){
            const address = enAddress.address;
            this.maps[id]['address'] = {
              country: address.country,
              countryCode: address.country_code,
              state: address.state ? address.state : address.region,
              city: address.city ? address.city : (address.village ? address.village : address.town),
              street: address.suburb,
              postCode: address.postcode
            }
            this.maps[id]['longitude'] = enAddress.lat;
            this.maps[id]['latitude'] = enAddress.lon;
          }
        },
        error: (err: any) => {
          console.log(err);
          this.maps[id]['loading'] = false;
        }
      });

      this.addMarker(id, e.latlng, this.maps[id]['stringAddress'])
    })

    this.maps = {[id]: { map, stringAddress: '' }, ...this.maps}

    tiles.addTo(this.maps[id].map);
  }

  async addMarker(id: string, coords: any, address: string){

    if(this.maps[id]['marker']) this.maps[id].map.removeLayer(this.maps[id]['marker']);

    this.maps[id]['marker'] = Leaflet.marker(coords);

    if(address) this.maps[id]['marker'].bindPopup(address).openPopup()

    this.maps[id].map.addLayer(this.maps[id]['marker'])
    console.log("draw marker : ", coords);
  }

  isFormValid(){
    return this.form.valid && this.headers.filter(h => h.type == 'map').reduce((acc, curr) => acc && this.maps[this.getFullHeaderName(curr)]['address'], true)
  }
}
