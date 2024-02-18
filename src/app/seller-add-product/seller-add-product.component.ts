import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addproductMessage: string | undefined;


  constructor(private product: ProductService) { }

  ngOnInit(): void {
  }

  submit(data:product) {
    this.product.addproduct(data).subscribe((result) => {
      console.log(result);
      if (result) {
        this.addproductMessage = 'product is successfully added';
      }
      setTimeout(() => this.addproductMessage = undefined, 3000);
    })
  }
  
  addproductlist(){
    this.product.productlist().subscribe((data) => {
      console.log(data)
    })
  }

}



