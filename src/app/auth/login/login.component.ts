import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, NgForm, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { take } from 'rxjs/operators';
import { UIServiceService } from 'src/app/shared/ui-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

hide = true;
isLoading = false;
loadingSubscription: Subscription;
loginForm: FormGroup;
  constructor(private authService: AuthService, private uiService: UIServiceService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

    onSubmit() {
    this.loadingSubscription = this.uiService.responseChange.subscribe(response => {
    this.isLoading = response;
    });
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

    getErrorMessage() {
    if (!this.loginForm.value.email) {
      return 'You must enter a value';
    } else {
    return 'not a valid email';

    }
  }

  ngOnDestroy() {
    this.loadingSubscription ? this.loadingSubscription.unsubscribe() : '';
  }

}
