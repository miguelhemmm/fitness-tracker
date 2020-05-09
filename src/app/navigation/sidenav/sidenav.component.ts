import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/app.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

isAuth: Observable<boolean>;

@Output() closeEmitter = new EventEmitter<void>();
  constructor(private authService: AuthService, private store$: Store<fromApp.State>) { }

  ngOnInit(): void {
  this.isAuth = this.store$.select(fromApp.getisAuthenticated);
  }

  onClose() {
  this.closeEmitter.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logOut();
  }

}
