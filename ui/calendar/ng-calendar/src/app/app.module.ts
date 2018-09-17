import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    CalendarComponent
  ]
})
export class AppModule { }
