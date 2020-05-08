import { AuthData } from './signup/auth-data.model';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UIServiceService } from '../shared/ui-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public authChange = new Subject<boolean>();

private isAuthenticated = false;

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIServiceService) { }



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
    this.uiService.responseChange.next(true);
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(response => {
    this.uiService.responseChange.next(false);
    })
    .catch(error => {
      this.uiService.responseChange.next(false);
      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    this.uiService.responseChange.next(true);
    this.angularFireAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(response => {
    this.uiService.responseChange.next(false);
    })
    .catch(error => {
      this.uiService.responseChange.next(false);
      this.uiService.showSnackBar(error.message, null, 3000);
    });
  }

  logOut() {
    this.angularFireAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
