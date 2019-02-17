import {Injectable} from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Currency} from './currency';
import {from, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private serverUrl = 'http://localhost:8889/socket';
  private stompClient;

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
      });

    });
    return marketSubObservable;
  }
}
