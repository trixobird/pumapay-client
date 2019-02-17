import {Component} from '@angular/core';
import {Currency} from './currency';
import {MarketService} from './market.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Real Time Currencies';
  usdStatus: Currency[];
  usdStatusToPlot: Currency[];

  set UsdStatus(status: Currency[]) {
    this.usdStatus = status;
    this.usdStatusToPlot = this.usdStatus.slice(0, 20);
  }

  constructor(private marketService: MarketService) {

    this.UsdStatus = [];

    const usdMarketUpdateObservable = this.marketService.getUpdates('USD');
    usdMarketUpdateObservable.subscribe((latestStatus: Currency) => {
      this.UsdStatus = [latestStatus].concat(this.usdStatus);
    });
  }
}

