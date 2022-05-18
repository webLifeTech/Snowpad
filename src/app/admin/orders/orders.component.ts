import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  AllOrderList: any = [];
  isSpinner: boolean = false;
  constructor(
    public api: ApiService,
    public router: Router,
  ) {
    this.getOrderList();
  }

  ngOnInit(): void {
  }

  getOrderList() {
    let body = { skip: 0 }
    this.api.post('all-order', body).then((res: any) => {
      console.log("res>>>", res);
      this.AllOrderList = res['res'];
    })
  }

  deleteProduct(id: any, inx: any) {
    let body = { id: id }
    this.api.post('delete-product', body).then((res: any) => {
      this.AllOrderList.splice(inx, 1)
    })
  }

  updateProductStatus(item: any) {

    let body = { id: item.id, ord_status: item.ord_status }
    this.api.post('update-orderstatus', body).then((res: any) => {
      console.log("res>>>", res);

      // this.AllOrderList.splice(inx, 1)
    })
  }

  editProduct(item: any) {
    this.router.navigate(['/admin/product/edit', item])
  }
}
