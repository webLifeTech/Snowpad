import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {

  productForm: any = {
    name: 'Test',
    selling_price: 100,
    market_price: 120,
    min_qty: 5,
    size: 'XXl',
    description: 'Test 1234',
    photo: []
  }

  isAction: boolean = false;
  constructor(
    public route: ActivatedRoute,
    public api: ApiService
  ) {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      if (params['kay'] == "add") {
        this.isAction = false;
      } else {
        this.isAction = true;

        // this.productForm = params['kay'];
        this.productForm = {
          id: params.id,
          name: params.name,
          selling_price: params.selling_price,
          market_price: params.market_price,
          min_qty: params.min_qty,
          size: params.size,
          description: params.description,
          photo: [],
        }
        let photos = JSON.parse(params.photo);
        for (let i in photos) {
          this.productForm.photo.push({
            image: photos[i],
            type: 'old'
          })
        }
        console.log(":this.productForm.photo>>", this.productForm);
        // this.productForm.photo = JSON.parse(this.productForm.photo)
      }
    })
  }

  ngOnInit(): void {
  }

  saveProduct() {


    console.log("this.isAction>>>", this.isAction);

    if (!this.isAction) {
      this.api.post('add-product', this.productForm).then((res: any) => {
        console.log("res>>>", res);
        if (res.status) {
          // res.msg
        } else {

        }
      })
    }

    if (this.isAction) {
      this.api.post('update-product', this.productForm).then((res: any) => {
        if (res.status) {
          // res.msg
        } else {

        }
        console.log("res>>>", res);
      })
    }
  }

  uploadImage(event: any) {
    console.log("event>>>", event.target);
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = () => {
      console.log('RESULT', reader.result)
      this.productForm.photo.push({
        image: reader.result,
        type: 'new'
      })
    }
    reader.readAsDataURL(file);
  }

  imageRemove(index: any) {
    console.log("index>>", index);

    this.productForm.photo.splice(index, 1)
  }

}
