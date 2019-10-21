import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {MainPageModule} from './pages/main/main.page.module';
import {NgxElectronModule} from 'ngx-electron';
import {HttpClientModule} from '@angular/common/http';
import {StreamService} from './shared/stream.service';
import {PeerService} from './shared/peer.service';

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
  providers: [PeerService, StreamService],
  bootstrap: [AppComponent]
})
export class AppModule { }
