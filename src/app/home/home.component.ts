import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  item: any;

  popularproduct: undefined | product[]
  trandyproduct: undefined | product[]

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.popularproduct().subscribe((data) => {
      console.log(data);
      this.popularproduct = data;
    })
    this.product.trandyproduct().subscribe((data)=>{
      this.trandyproduct=data
    })
  }
}
