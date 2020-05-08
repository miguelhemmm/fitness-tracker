import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

@Output() sidenavToggle = new EventEmitter();
isAuth: boolean;
isAuthSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthSubscription = this.authService.authChange.subscribe(data => {
      this.isAuth = data;
    });
  }

  onToggle() {
  this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy() {
  this.isAuthSubscription ? this.isAuthSubscription.unsubscribe() : '';
  }
}
