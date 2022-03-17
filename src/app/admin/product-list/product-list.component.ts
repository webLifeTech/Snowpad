import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  AllProductList: any = []
  constructor(
    public api: ApiService,
    public router: Router,
  ) {
    this.getProductList();
  }

  ngOnInit(): void {
  }

  getProductList() {
    let body = { skip: 0 }
    this.api.post('get-product', body).then((res: any) => {
      console.log("res>>>", res);
      this.AllProductList = res['res'];
    })
  }

  deleteProduct(id: any, inx: any) {
    let body = { id: id }
    this.api.post('delete-product', body).then((res: any) => {
      this.AllProductList.splice(inx, 1)
    })
  }
  editProduct(item: any) {
    this.router.navigate(['/admin/product/edit', item])
  }

}
