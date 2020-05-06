import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, NgForm, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

hide = true;
errorMessage: string;
loginForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])

    })

  }

    onSubmit() {
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

}
