import { Component, OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  sellerlogin: any;

  constructor(private seller: SellerService, private router: Router) { }
  showLogin = false

  ngOnInit(): void {
  }
  signUp(data: signUp): void {
    console.log(data);
    this.seller.userSignUp(data);

    // this.seller.userSignUp(data).subscribe((result)=>{
    // return this.router.navigate(['seller-home']);
    // })
  }
  login(data: signUp): void {
    // console.log(data);
    this.seller.userLogin(data);
  }


  openlogin() {
    this.showLogin = true
  }
  openSignUp() {
    this.showLogin = false
  }


}
