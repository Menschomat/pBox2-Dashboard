import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { PrintBoxComponent } from './components/print-box/print-box.component';
import { SensorStatsComponent } from './components/sensor-stats/sensor-stats.component';
import { EnclosureComponent } from './components/enclosure/enclosure.component';
import { FanComponent } from './components/fan/fan.component';
import { LightComponent } from './components/light/light.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from './components/switch/switch.component';

@NgModule({ declarations: [
        AppComponent,
        PrintBoxComponent,
        SensorStatsComponent,
        EnclosureComponent,
        FanComponent,
        LightComponent,
        IndicatorComponent,
        SwitchComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        FormsModule,
        BrowserAnimationsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
