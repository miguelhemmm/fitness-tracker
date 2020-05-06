import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

@Output() sidenavToggle = new EventEmitter();
isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authChange.pipe(take(1)).subscribe(data => {
      this.isAuth = data;
    });
  }

  onToggle() {
  this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logOut();
  }
}
