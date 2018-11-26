import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {SocketService} from './shared/socket.service';
import {MainPageModule} from './pages/main/main.page.module';
import {NgxElectronModule} from 'ngx-electron';
import {HttpClientModule} from '@angular/common/http';
import {StreamService} from './shared/stream.service';
import {UrlShortenerService} from './shared/url-shortener.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    NgxElectronModule,

    MainPageModule,
  ],
  providers: [SocketService, StreamService, UrlShortenerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
