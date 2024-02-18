import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productdata: undefined | product;
  productquantity: number = 1;

  constructor(private activeroute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeroute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId && this.product.getproduct(productId).subscribe((result) => {
      console.log(result);
      this.productdata = result
    })
  }

  handleQuantity(val: string) {
    if (this.productquantity < 20 && val === 'plus') {
      this.productquantity += 1
    }
    else if (this.productquantity > 1 && val === 'min') {
      this.productquantity -= 1

    }

  }

  AddtoCart(){
    if(this.productdata){
      this.productdata.quantity=this.productquantity
      console.log(this.productdata);
    }
  }

}
