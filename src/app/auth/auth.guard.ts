import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router, private store$: Store<fromRoot.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store$.select(fromRoot.getisAuthenticated) ? true : this.router.navigate(['login']);
    // return this.authService.isAuth() ? true : this.router.navigate(['login']);
  }

  canLoad(route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store$.select(fromRoot.getisAuthenticated) ? true : this.router.navigate(['login']);
    // return this.authService.isAuth() ? true : this.router.navigate(['login']);
  }
}
