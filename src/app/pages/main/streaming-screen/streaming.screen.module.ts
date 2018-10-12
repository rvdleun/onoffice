import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {StreamingScreen} from './streaming.screen';
import {UrlShortenerComponent} from './url-shortener/url-shortener.component';

@NgModule({
    declarations: [StreamingScreen, UrlShortenerComponent],
    exports: [StreamingScreen],
    imports: [BrowserModule, FormsModule],
})
export class StreamingScreenModule { }