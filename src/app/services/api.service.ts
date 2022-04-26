import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverURl: string = 'http://snowpad.in/api/';
  imageURl: string = 'http://snowpad.in/image/product/';
  constructor(
    private http: HttpClient
  ) {
  }

  post(url: string, data: any) {
    let headers = new HttpHeaders()
    headers.set('content-type', 'application/json')
    headers.set('Access-Control-Allow-Origin', '*')
    return new Promise((resolve, reject) => {
      this.http.post(this.serverURl + url, data, { headers: headers }).subscribe((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      })
    })
  }
}
