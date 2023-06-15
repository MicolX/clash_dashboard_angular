import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LogInDialogComponent } from './log-in-dialog/log-in-dialog.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LogInDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
