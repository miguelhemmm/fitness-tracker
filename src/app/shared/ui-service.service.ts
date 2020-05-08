import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class UIServiceService {

public responseChange = new Subject<any>();

  constructor(private snackbar: MatSnackBar) { }

  showSnackBar(message, action, duration) {
    this.snackbar.open(message, action, {
      duration: duration
      });
  }
}
