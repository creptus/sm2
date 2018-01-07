import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Bedroom} from '../models/bedroom';

@Injectable()
export class BedroomService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  /**
   *
   * @return {Promise<R>|Maybe<T>|Observable<R|T>|Promise<Promise<any>>|promise.Promise<R>|any}
   */
  getStatus(): Promise<Bedroom> {
    return this.http
      .post('/api/bedroom/status', JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(data => {
        console.log(data);
        return data as Bedroom;
      })
      .catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  /**
   *
   * @param soptions {command: string}
   * @return {Promise<R>|Maybe<T>|Observable<R|T>|Promise<Promise<any>>|promise.Promise<R>|any}
   */
  moveServo(options: any): Promise<any> {
    return this.http
      .post('/api/bedroom/servo/move', JSON.stringify(options), {headers: this.headers})
      .toPromise()
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
  }

}
