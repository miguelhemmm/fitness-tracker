import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

isAuth: boolean;

@Output() closeEmitter = new EventEmitter<void>();
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authChange.pipe(take(1)).subscribe(data => {
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

}
