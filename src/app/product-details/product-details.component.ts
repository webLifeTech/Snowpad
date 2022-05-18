import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Lightbox } from 'ngx-lightbox';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetails: any = [];
  currentSlide: any;
  // Image cursor
  imagesSlider: any = {
    // speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    // fade: false,
    autoplay: true,
    draggable: true,
    prevArrow: '.client-feedback .prev-arrow',
    nextArrow: '.client-feedback .next-arrow',
    asNavFor: ".thumbs",
    infinite: true
  };
  thumbnailsSlider = {
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 2,
    cssEase: 'linear',
    autoplay: false,
    centerMode: false,
    draggable: true,
    focusOnSelect: true,
    asNavFor: ".feedback",
    infinite: true,
    variableWidth: true,
  };
  formObj: any = {
    quantity: 1
  }

  isDisabled: boolean = false;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public api: ApiService,
    private _lightbox: Lightbox,
    private toastr: ToastrService,
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
      console.log("product-details>>", res.data);

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

  //slick-carousel Change event
  afterChange(e: any) {
    this.currentSlide = e.currentSlide;
  }

  // Open lightbox image privew
  openLightbox(row: any, imgArrayName: any, index: number): void {
    let finalData = this.api.lightboxImage(row, imgArrayName);
    console.log("finalData>>>>>", finalData);

    this._lightbox.open(finalData, index, { wrapAround: true, showImageNumberLabel: true });
  }

  // Quantity
  quantity(quantity: any) {
    if (quantity == 1) {
      this.formObj.quantity++
    } else {
      let qt = this.formObj.quantity
      if (qt && qt > this.productDetails.min_qty) {
        this.formObj.quantity--
      } else {
        this.toastr.warning('Minimum ' + this.productDetails.min_qty + ' quantity required', 'Warning', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    }
  }

  // Update Quantity
  updateQuantity() {
    let qt = this.formObj;
    if (!qt.quantity || qt.quantity == 0) {
      this.formObj.quantity = this.productDetails.min_qty || 1;
    } else {
      if (qt && qt.quantity < this.productDetails.min_qty) {
        this.formObj.quantity = this.productDetails.min_qty || 1;

        this.toastr.error('Need minimum ' + this.productDetails.min_qty + ' quantity for this Pad', 'Warning', {
          timeOut: 5000,
          positionClass: 'toast-top-right',
          progressBar: true,
          progressAnimation: 'increasing'
        });
      }
    }
  }

  addToCart() {

  }

  // Only numbers allowed
  keyPressOnlyNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

}
