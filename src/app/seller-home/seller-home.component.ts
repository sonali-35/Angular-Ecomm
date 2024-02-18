import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productlist: undefined | product[]
  productmessage: undefined | string


  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.list()
  }
  deleteproduct(id: number) {
    console.log("test id", id)
    this.product.deletrproduct(id).subscribe((result) => {
      if (result) {
        this.productmessage = "product is deleted";
        this.list();
      }
    })
    setTimeout(() => {
      this.productmessage = undefined;
    }, 3000);
  }
  list() {
    this.product.productlist().subscribe((result) => {
      console.log(result);
      this.productlist = result;
    })
  }

}



