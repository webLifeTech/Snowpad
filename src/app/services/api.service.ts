import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverURl: string = 'https://snowpad.in/api/';
  imageURl: string = 'https://snowpad.in/image/product/';
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

  // Images Preview return data
  lightboxImage(product: any, key: any) {
    console.log("product>>>", product);
    console.log("key>>>", key);
    let imgArray = [];
    if (product && product[key] && product[key].length) {
      for (let i in product[key]) {
        if (product[key][i]['url']) {
          product[key][i]['src'] = this.imageURl + product[key][i]['url'];
          imgArray.push(product[key][i]);
        } else {
          let src = '';
          src = this.imageURl + product[key][i];
          imgArray.push({ src: src });
        }
      }
    }
    return imgArray;
  }
}
