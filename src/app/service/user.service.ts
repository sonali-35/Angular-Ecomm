import { Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  invalidUserAuth = new EventEmitter<boolean>(false)

  url = "http://localhost:3000/user";

  constructor(private http: HttpClient, private router: Router) { }
  usersignup(user: signUp) {
    return this.http.post("http://localhost:3000/user", user, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['/'])
        }
      })
  }

  userAuthreload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/user-auth']);
    }
  }

  userlogin(data: login) {
    return this.http.get<signUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`,
      { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body?.length) {
          this.invalidUserAuth.emit(false)

          localStorage.setItem('user', JSON.stringify(result.body[0]))
          this.router.navigate(['/'])
        } else {
          this.invalidUserAuth.emit(true)
        }
      })
  }
}
