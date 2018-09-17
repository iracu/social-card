import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ClipboardModule} from 'ngx-clipboard';
import {DataBaseService} from './database.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ClipboardModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataBaseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
