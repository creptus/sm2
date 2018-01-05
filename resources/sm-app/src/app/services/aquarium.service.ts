import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import {Aquarium}from '../models/models';

@Injectable()
export class AquariumService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
  }

  /**
   *
   * @return {Promise<R>|Maybe<T>|Observable<R|T>|Promise<Promise<any>>|promise.Promise<R>|any}
   */
  getStatus(): Promise<Aquarium> {
    return this.http
      .post('/api/aquarium/status', JSON.stringify({}), {headers: this.headers})
      .toPromise()
      .then(data => {
        console.log(data);
        return data as Aquarium;
      })
      .catch(err => {
        console.error(err);
        return Promise.reject(err);
      });
  }

  /**
   *
   * @param socketNumber
   * @param state
   * @return {Promise<R>|Maybe<T>|Observable<R|T>|Promise<Promise<any>>|promise.Promise<R>|any}
   */
  switchSocket(socketNumber: number, state: boolean): Promise<any> {
    return this.http
      .post('/api/aquarium/socket/switch', JSON.stringify({
        socketNumber: socketNumber,
        state: state
      }), {headers: this.headers})
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
