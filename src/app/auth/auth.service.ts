import { AuthData } from './signup/auth-data.model';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private user: User;
public authChange = new Subject<boolean>();

  constructor(private router: Router) { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 100).toString()
    };
    this.succesfullAuth();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 100).toString()
    };
    this.succesfullAuth();
  }

  logOut() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  succesfullAuth() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

}
