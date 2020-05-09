import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

minDate: Date;
maxDate: Date;
isLoading: boolean;
hide = true;
email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private authService: AuthService,
    private store$: Store<fromApp.State>) { }

  ngOnInit() {
  this.store$.select(fromApp.getisLoading).subscribe(isloading => this.isLoading = isloading);
  this.maxDate = new Date();
  this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

    getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


}
