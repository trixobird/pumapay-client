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

  gbpStatus: Currency[];
  gbpStatusToPlot: Currency[];

  pumaStatus: Currency[];
  pumaStatusToPlot: Currency[];

  set UsdStatus(status: Currency[]) {
    this.usdStatus = status;
    this.usdStatusToPlot = this.usdStatus.slice(0, 20);
  }

  set GbpStatus(status: Currency[]) {
    this.gbpStatus = status;
    this.gbpStatusToPlot = this.gbpStatus.slice(0, 20);
  }

  set PumaStatus(status: Currency[]) {
    this.pumaStatus = status;
    this.pumaStatusToPlot = this.pumaStatus.slice(0, 20);
  }

  constructor(private marketService: MarketService) {

    this.UsdStatus = [];
    this.GbpStatus = [];
    this.PumaStatus = [];
    const marketUpdateObservable = this.marketService.getUpdates();
    marketUpdateObservable.subscribe((latestStatus: Currency) => {
      switch (latestStatus.to) {
        case 'USD':
          this.UsdStatus = [latestStatus].concat(this.usdStatus);
          break;
        case 'GBP':
          this.GbpStatus = [latestStatus].concat(this.gbpStatus);
          break;
        case 'PUMA':
          this.PumaStatus = [latestStatus].concat(this.pumaStatus);
          break;
      }
    });
  }
}

