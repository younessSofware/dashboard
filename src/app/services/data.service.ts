import { API_URL } from './../common/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type RequestMethod = 'get' | 'post' | 'delete' | 'put';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(protected http: HttpClient) { }
  sendGetRequest(url: string, params: any, api = true): Observable<object>{
    return this.http.get(API_URL + url, {
      params
    });
  }

  sendPostRequest(url: string, data: any): Observable<object>{
    return this.http.post(API_URL + url, data);
  }

  sendPutRequest(url: string, data: any): Observable<object>{
    return this.http.put(API_URL + url, data );
  }

  sendDeleteRequest(url: string): Observable<object>{
    return this.http.delete(API_URL + url);
  }

  sendRequest(method: RequestMethod, url: string, data?: any){
    return method == 'get' ? this.sendGetRequest(url, data) :
    (method == 'post' ? this.sendPostRequest(url, data) :
    (method == 'delete' ? this.sendDeleteRequest(url) :
    (method == 'put' ? this.sendPutRequest(url, data) : null)));
  }
}
