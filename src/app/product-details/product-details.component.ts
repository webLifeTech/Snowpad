import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetails: any = [];
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public api: ApiService
  ) {
    this.route.params.subscribe((params: any) => {
      // this.productDetails = params;
      // console.log("productDetails>>>", this.productDetails)
      // this.productDetails.photo = JSON.parse(this.productDetails.photo);
      // console.log("productDetails>>>", this.productDetails.photo);
      this.getProductList(params.key)
    })
  }

  getProductList(id: any) {
    let body = { id: id }
    this.api.post('get-product-details', body).then((res: any) => {
      console.log(" res['res']>>", res);

      this.productDetails = res['data'];
      this.productDetails.qty = 1
      this.productDetails.photo = JSON.parse(this.productDetails.photo);
    })
  }

  ngOnInit(): void {
  }

  buyItNow(id: any) {
    console.log(">>>>>");

    // const id = item.id
    // delete item.photo
    // delete item.id
    // this.router.navigate(['/product-details/' + id, item])
    this.router.navigate(['/checkout/direct-buy/' + id, this.productDetails])
  }

}
