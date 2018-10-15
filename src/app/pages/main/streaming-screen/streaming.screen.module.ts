import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {StreamingScreen} from './streaming.screen';
import {UrlShortenerComponent} from './url-shortener/url-shortener.component';
import {StatusComponent} from './status/status.component';
import {IpAddressComponent} from './ip-address/ip-address.component';
import {StopStreamingComponent} from './stop-streaming/stop-streaming.component';

@NgModule({
    declarations: [StreamingScreen, IpAddressComponent, StatusComponent, StopStreamingComponent, UrlShortenerComponent],
    exports: [StreamingScreen],
    imports: [BrowserModule, FormsModule],
})
export class StreamingScreenModule { }