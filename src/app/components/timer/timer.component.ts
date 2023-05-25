import { Component } from '@angular/core';
import { Observable, interval, map } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  startTime?: number;
  timer: any;
  displayTime = '00:00:000';
  isIntervalRunning: boolean = false

  start() {
    if (this.isIntervalRunning === false) {
      this.startTime = Date.now();
      this.timer = setInterval(() => {
        const now = Date.now();
        const diff = now - this.startTime!;
        const minutes = Math.floor(diff / (60 * 1000));
        const seconds = Math.floor((diff % (60 * 1000)) / 1000);
        const milliseconds = diff % 1000;
        this.displayTime = `${this.formatTime(minutes)}:${this.formatTime(seconds)}:${this.formatMilliseconds(
          milliseconds
        )}`;
      }, 1);

      this.isIntervalRunning = true
    }

  }

  stop() {
    clearInterval(this.timer);
    this.isIntervalRunning = false;

  }


  private formatTime(time: number): string {
    return time.toString().padStart(2, '0');
  }

  private formatMilliseconds(time: number): string {
    return time.toString().padStart(3, '0');
  }
}
