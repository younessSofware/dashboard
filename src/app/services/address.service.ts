import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAddress(latitude: number, longitude: number, language: string){
    return this.http.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2', {
      params: {
        lat: latitude.toString(),
        lon: longitude.toString(),
        'accept-language': language
      }
    })
  }

  // getNewAddress(latitude: number, longitude: number){
  //   const api_key = 'a2cea758c6123b39d55fa9b1cbac131b';
  //   return this.http.get('http://api.positionstack.com/v1/forward', {
  //     access_key: api_key,
  //     query: '' + latitude + ',' + longitude
  //   })
  // }
}
