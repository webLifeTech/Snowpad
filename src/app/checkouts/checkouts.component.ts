import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.scss']
})
export class CheckoutsComponent implements OnInit {
  cartFormData: any = {
    country: 'India',
    totalAmt: '100',
    firstName: 'Paras',
    lastName: 'Gogdani',
    city: 'Rajkot',
    address: '144, Shiv Shakti Colony Rd No 12, Yogi Nagar, Rajkot, Gujarat 360005',
    pincode: '360005',
    phoneno: '6353167265',
    email: 'parasgogdani027@gmail.com',
    state: 'Gujarat',
    whatsapp_number: '6353167265',
    ordernote: 'Please Fast',
    userId: '1',
    product: [
      { 'proId': '', 'qty': '', 'selling_price': '', 'market_price': '' }
    ]
  }
  checkoutType: any;

  constructor(
    public route: ActivatedRoute,
    public api: ApiService
  ) {
    this.route.params.subscribe((params: any) => {
      this.checkoutType = params['key'];
      if (this.checkoutType == 'direct-buy') {
        this.cartFormData.product[0].proId = params['id'];
        this.cartFormData.product[0].qty = params['qty'];
        this.cartFormData.product[0].selling_price = params['selling_price'];
        this.cartFormData.product[0].market_price = params['market_price'];
      }
    })
  }

  ngOnInit(): void {
  }

  completeOrder() {
    this.api.post('add-order', this.cartFormData).then((res: any) => {
      if (res.status) {
      } else {
      }
    })
  }

}
