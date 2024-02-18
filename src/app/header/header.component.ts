import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  sellername: string = '';
  searchresult: undefined | product[]; //push
  username:string='';

  constructor(private route: Router, private product: ProductService) { }

  ngOnInit(): void {

    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerstore = localStorage.getItem('seller');
          let sellerData = sellerstore && JSON.parse(sellerstore)[0];
          this.sellername = sellerData.name;
          this.menuType = "seller";

        } else if(localStorage.getItem("user")){
          let userstore=localStorage.getItem('user');
          let userData=userstore && JSON.parse(userstore)
          this.username=userData.name;
          this.menuType="user";

        } else {
          this.menuType = "default"
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }
  userlogout(){
    localStorage.removeItem('user')
    this.route.navigate(['/'])
  }

  // call serchproduct

  searchproduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.product.searchproduct(element.value).subscribe((result) => {
        // console.log(result);
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchresult = result; //push
      })
    }
  }
  hidesearch() {
    this.searchresult = undefined;
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id])
  }
  submitSearch(val: string) {
    console.log(val);
    this.route.navigate([`search/${val}`])
  }

}


