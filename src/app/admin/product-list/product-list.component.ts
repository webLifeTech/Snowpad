import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // let body = { id: id }
        // this.api.post('delete-product', body).then((res: any) => {
        //   this.AllProductList.splice(inx, 1)
        // })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  editProduct(item: any) {
    this.router.navigate(['/admin/product/edit', item])
  }

}
