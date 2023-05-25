import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snak-warn',
  templateUrl: './snak-warn.component.html',
  styleUrls: ['./snak-warn.component.scss']
})
export class SnakWarnComponent {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
  }

  handleOnline() {
    this.snackBar.dismiss();
  }



  
  //find create array of numbers.

  
  handleOffline(): void {
    this.snackBar.open('No internet connection', 'Dismiss', {
      duration: 5000,
      panelClass: ['snackbar-error']
    });
  }
}
