import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import {EventService, EventRequestStart, EventRequestEnd} from './event.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
  constructor(private eventService: EventService) {

  }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('start');
    this.eventService.broadcast(EventRequestStart, {});
    return next
      .handle(request)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          // console.log('processing response', ev);
          this.eventService.broadcast(EventRequestEnd, {});
        }
      });
  }
}
