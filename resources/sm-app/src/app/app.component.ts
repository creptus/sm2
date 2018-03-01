import {Component} from '@angular/core';
import {EventService, EventRequestStart, EventRequestEnd} from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';

  requestsInProgressCount: number;

  constructor(private eventService: EventService) {
    this.requestsInProgressCount = 0;
    eventService.on(EventRequestStart, () => {
      this.requestsInProgressCount++;
      const el = document.getElementById('requests-in-progress-count');
      if (el) {
        el.style.display = 'inherit';
      }
    });
    eventService.on(EventRequestEnd, () => {
      if (this.requestsInProgressCount > 0) {
        this.requestsInProgressCount--;
      }
      if (this.requestsInProgressCount <= 0) {
        const el = document.getElementById('requests-in-progress-count');
        if (el) {
          el.style.display = 'none';
        }
      }
    });
  }
}
