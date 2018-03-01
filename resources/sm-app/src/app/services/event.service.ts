/**
 * Created by akorolev on 23.10.2017.
 */

import {Injectable} from '@angular/core';

import {Socket} from './socket';

declare var wstoken: string;

export class Subscription {
  protected func: any;

  constructor(func) {
    this.func = func;
  }

  public isAvailable(): boolean {
    return typeof this.func === 'function';
  }

  public run(args): void {
    if (this.isAvailable()) {
      this.func(args);
    }
  }

  public unsubscribe(): void {
    this.func = null;
  }
}

@Injectable()
export class EventService {
  protected listeners: any;


  constructor() {
    this.listeners = {};


  }

  protected socket: Socket;

  /**
   *
   */
  public enableSocketEvents(): Socket {
    if (this.socket) {
      return this.socket;
    }
    this.socket = new Socket();
    this.socket.debug = true;
    this.socket.onConnected = () => {
      const socketMessageAuth = {token: ''};
      if (typeof wstoken === 'string' && wstoken !== '') {
        socketMessageAuth.token = wstoken;
      }
      this.socket.send(socketMessageAuth);
    };
    this.socket.subscribe('*', (event, data) => {
      if (this.socket.debug) {
        console.log(event, data);
      }
      this.broadcast(`socket.${event.name}`, typeof data.message !== 'undefined' ? data.message : {});
      this.broadcast(`*`, typeof data.message !== 'undefined' ? data.message : {});
    });

    this.socket.connect();
    return this.socket;
  }


  public on(name, listener): Subscription {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }
    const el = new Subscription(listener);
    this.listeners[name].push(el);
    return el;

  }

  public broadcast(name, ...args): void {
    if (typeof this.listeners[name] === 'undefined') {
      return;
    }
    for (const l of this.listeners[name]) {
      l.run(args);
    }
    this.clear();
  }

  public clear(): void {
    for (const event of Object.keys(this.listeners)) {
      for (let i = 0; i < this.listeners[event].length; i++) {
        if (this.listeners[event][i].isAvailable()) {
          continue;
        }
        this.listeners[event].splice(i, 1);
      }
    }
  }
}


export const EventRequestStart = 'http.request.start';
export const EventRequestEnd = 'http.request.end';
