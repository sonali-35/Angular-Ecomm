import { Component, OnInit } from '@angular/core';
import { login, signUp } from '../data-type';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
 authError:string="";
  result: any
  
  constructor(private user: UserService, private router: Router) { }
  showLogin = false;

  ngOnInit(): void {
    this.user.userAuthreload();
  }

  signup(data: signUp) {
   this.user.usersignup(data);
  }

  login(data: login) {
    this.user.userlogin(data);
   this.user.invalidUserAuth.subscribe((result)=>{
    console.log("apple",result);
    if(result){
      this.authError="plz enter valid user details"
    }

   })
  }

  openlogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
