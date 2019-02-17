import {Injectable} from '@angular/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private serverUrl = 'http://localhost:8889/socket';
  private stompClient;

  messages: string[] = [];

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function f() {
      that.stompClient.subscribe('/msg', (message) => {
        if (message.body) {
          const currency = JSON.parse(message.body);
          that.messages.push(currency.value);
        }
      });
    });
  }

  clear() {
    this.messages = [];
  }
}
