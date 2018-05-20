import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {SocketService} from './shared/socket.service';
import {MainPageModule} from './pages/main/main.page.module';
import {NgxElectronModule} from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    NgxElectronModule,

    MainPageModule,
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
