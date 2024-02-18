import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { login, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller',
      data,
      { observe: 'response' }).subscribe((result) => {
        console.log(result)
        this.isSellerLoggedIn.next(true);
        if (result) {

          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        }

      })

  }
  reloadseller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: login) {
    console.log(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result: any) => {
      console.log(result);
      if (result && result.body && result.body.length) {
        console.log("user logged in");
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])

      } else {
        console.log("logged faild");
      }
    })
  }
}





