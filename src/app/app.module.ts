import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { PrintBoxComponent } from './components/print-box/print-box.component';
import { SensorStatsComponent } from './components/sensor-stats/sensor-stats.component';
import { EnclosureComponent } from './components/enclosure/enclosure.component';

@NgModule({
  declarations: [
    AppComponent,
    PrintBoxComponent,
    SensorStatsComponent,
    EnclosureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
