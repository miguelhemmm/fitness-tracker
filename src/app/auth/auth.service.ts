import { AuthData } from './signup/auth-data.model';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public authChange = new Subject<boolean>();
public errorChange = new Subject<string>();

private isAuthenticated = false;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth, private trainingService: TrainingService) { }



   succesfullAuth() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(response => {
      this.succesfullAuth();
    })
    .catch(error => {
      this.errorChange.next(error.message);
    });
  }

  login(authData: AuthData) {
    this.angularFireAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(response => {
      this.succesfullAuth();
    })
    .catch(error => {
      this.errorChange.next(error.message);
    });
  }

  logOut() {
    this.angularFireAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
