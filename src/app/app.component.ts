import { Component } from '@angular/core';
import {Currency} from './currency';
import {MessageService} from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'msg-client';
  marketStatus: Currency[];
  marketStatusToPlot: Currency[];

  set MarketStatus(status: Currency[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus.slice(0, 20);
  }

  constructor(private marketStatusSvc: MessageService) {
    MessageService.getInitialMarketStatus()
      .subscribe(() => {
        this.MarketStatus = [];

        const marketUpdateObservable = this.marketStatusSvc.getUpdates();  // 1
        marketUpdateObservable.subscribe((latestStatus: Currency) => {  // 2
          this.MarketStatus = [latestStatus].concat(this.marketStatus);  // 3
        });  // 4
      });
  }
}

