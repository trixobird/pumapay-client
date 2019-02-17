import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MarketChartComponent} from './market-chart/market-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MarketChartComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
