import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  AllProductList: any = []
  constructor(
    public api: ApiService,
    public router: Router,
  ) {
    this.getProductList();
  }

  ngOnInit(): void {
    this.loadScript();
  }

  getProductList() {
    let body = { skip: 0 }
    this.api.post('get-product', body).then((res: any) => {

      this.AllProductList = res['res'];
      for (let i in this.AllProductList) {
        this.AllProductList[i].photo = JSON.parse(this.AllProductList[i].photo);
      }
      console.log("res>>>", this.AllProductList);
    })
  }

  viewProductDetail(item: any) {
    // const id = item.id
    // delete item.photo
    // delete item.id
    this.router.navigate(['/product-details/' + item.id])
  }

  loadScript() {
    console.log("loadScript???");

    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'assets/js/main.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

}
