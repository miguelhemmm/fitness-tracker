import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

isAuth: boolean;
isAuthSubscription: Subscription;

@Output() closeEmitter = new EventEmitter<void>();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthSubscription = this.authService.authChange.subscribe(data => {
      this.isAuth = data;
    });
  }

  onClose() {
  this.closeEmitter.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logOut();
  }

  ngOnDestroy() {
    // tslint:disable-next-line: no-unused-expression
    this.isAuthSubscription ? this.isAuthSubscription.unsubscribe() : '';
  }

}
