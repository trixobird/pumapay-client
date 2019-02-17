import {Injectable} from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Currency} from './currency';
import {from, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private serverUrl = 'http://localhost:8889/socket';
  private stompClient;

  messages: string[] = [];

  constructor() {
    // this.initializeWebSocketConnection();
  }

  static getInitialMarketStatus() {
    return of([]);
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function f() {
      that.stompClient.subscribe('/msg', (message) => {
        if (message.body) {
          const currency = JSON.parse(message.body);
          currency.date = Date.parse(currency.date);
          that.messages.push(currency.value);
        }
      });
    });
  }

  getUpdates() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const marketSub = new Subject<Currency>();
    const marketSubObservable = from(marketSub);

    const that = this;
    this.stompClient.connect({}, function f() {
      that.stompClient.subscribe('/msg', (message) => {
        const currency = JSON.parse(message.body);
        currency.date = new Date(currency.date);
        marketSub.next(currency);
        that.messages.push(currency.value);
      });

    });
    return marketSubObservable;
  }

  clear() {
    this.messages = [];
  }
}
