import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import * as fromApp from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

@Output() sidenavToggle = new EventEmitter();
isAuth: Observable<boolean>;

  constructor(private store$: Store<fromApp.State>, private authService: AuthService) { }

  ngOnInit(): void {
   this. isAuth = this.store$.select(fromApp.getisAuthenticated);
  }

  onToggle() {
  this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logOut();
  }

}
