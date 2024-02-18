import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productservice: ProductService) { }
  productdata: undefined | product
  productMessage:undefined |string;

  ngOnInit(): void {
    let prouctid = this.route.snapshot.paramMap.get('id');
    console.log(prouctid);
    prouctid && this.productservice.getproduct(prouctid).subscribe((data) => {
      console.log(data);
      this.productdata = data;
    })
  }
  submit(data:product) {
    console.log(data);
    if(this.productdata){
     data.id=this.productdata.id
    }
    this.productservice.updateproduct(data).subscribe((result)=>{
      if(result){
       this.productMessage="product has a upadated"
      }
    })
    setTimeout(() => {
      this.productMessage=undefined
    },3000);
  }

}
