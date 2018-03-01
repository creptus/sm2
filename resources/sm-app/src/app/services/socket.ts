/**
 * Created by akorolev on 01.11.2017.
 */


export class Socket {
  public debug: boolean;
  protected _socket: any;
  protected _isConnected: boolean;
  public onConnected: any;
  protected _listeners = [];
  protected _self: Socket;


  constructor() {
    this.debug = false;
    this._socket = null;
    this._isConnected = false;
    this.onConnected = null;
    this._self = this;

  }

  /**
   *
   * @return {string}
   */
  public getDate(): string {

    const now = new Date();

    function format(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;

    }

    const date = now.getFullYear() + '-' + format(now.getMonth() + 1) + '-' + format(now.getDate()) +
      ' ' + format(now.getHours()) + ':' + format(now.getMinutes()) + ':' + format(now.getSeconds());
    return date;
  }

  protected socketOnErrorHandle(error): void {

    console.log(this.getDate() + ' WS: Ошибка ');
    console.log(error);
  }

  protected socketOnOpenHandle(): void {
    console.log(this.getDate() + ' WS:The connection is success');
    this._isConnected = true;
    if (typeof this.onConnected === 'function') {
      this.onConnected();
    }
  }

  protected socketOnCloseHandle(event): void {
    this._isConnected = false;
    if (event.wasClean) {
      console.log(this.getDate() + ' WS:The connection is close clear');
    } else {
      console.log(this.getDate() + ' WS:The disconnection(breaking)'); // например, 'убит' процесс сервера
    }
    console.log(this.getDate() + ' WS: Code: ' + event.code + ' reason: ' + event.reason);
    // console.log(event);
    this._socket = null;
    // console.log('setTimeout');
    setTimeout(this.connect.bind(this), 10000);
  }

  protected socketOnMessageHandle(event): void {
    if (this.debug) {
      console.log(this.getDate() + ' WS:incoming data ' + event.data);
    }
    // console.log(event);
    const data = this._parseData(event.data);
    this._fireEvent(data);
  }


  public connect() {
    if (this._socket != null && typeof this._socket.close === 'function') {
      this._socket.close();
    }
    this._socket = null;
    if (typeof WebSocket === 'undefined') {
      console.error('Browser not supported WebSocket');
      return;
    }
    // создать подключение
    this._socket = new WebSocket('wss:/ws.example.com');

    this._socket.onopen = this.socketOnOpenHandle.bind(this);
    this._socket.onclose = this.socketOnCloseHandle.bind(this);
    this._socket.onmessage = this.socketOnMessageHandle.bind(this);
    this._socket.onerror = this.socketOnErrorHandle.bind(this);

  }

  /**
   *
   * @param message
   */
  public send(message) {
    if (this.debug) {
      console.log(this.getDate() + ' try send message', message);
    }
    if (this._socket && this._isConnected) {
      this._socket.send(JSON.stringify(message));
      console.log(this.getDate() + ' Send message Ok', message);
    } else {
      setTimeout(function () {
        this.send(message);
      }, 7000);
    }
  }

  /**
   *
   * @param data  {event:string, data:object, raw:string}
   * @private
   */
  protected _fireEvent(data) {
    let l;
    for (let i = 0; i < this._listeners.length; i++) {
      l = this._listeners[i];
      if (l === null) {
        continue;
      }
      if ((l.event === data.event || l.event === '*') && typeof l.handle === 'function') {
        l.handle({name: data.event}, data.data, data.raw);
      }
    }
  }

  /**
   *
   * @param {string} eventData
   * @returns {{data: {}, raw: string, event: string}}
   * @private
   */
  protected _parseData(eventData) {
    const data = {
      data: {event: null},
      raw: eventData,
      event: '*'
    };
    try {
      data.data = JSON.parse(eventData);
    } catch (e) {
      console.error(e);
      data.event = '*';
    }
    if (typeof data.data.event === 'undefined') {
      data.event = '*';
    } else {
      data.event = data.data.event;
      delete data.data.event;
    }
    return data;
  }

  /**
   *
   * @param {string} event
   * @param {function} handle
   * @returns {int}
   */
  subscribe(event, handle) {
    this._listeners.push({
      event: event,
      handle: handle
    });
    return this._listeners.length - 1;
  }

  /**
   *
   * @param {int} id
   */
  unSubscribe(id) {
    if (typeof this._listeners[id] !== 'undefined') {
      this._listeners.splice(id, 1);
    }
  }
}

/*
 let socket = new Socket();
 socket.debug = true;
 socket.onConnected = () => {
 var socketMessageAuth = {system: 'office', userId: 0};
 socket.send(socketMessageAuth);
 }
 socket.subscribe('*', (event, data) => {
 // emit(`socket.${event.name}`, typeof data.message != 'undefined' ? data.message : {});
 });

 socket.connect();*/




