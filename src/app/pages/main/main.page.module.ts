import {NgModule} from '@angular/core';
import {MainPageComponent} from './main.page';
import {SelectScreensComponent} from './select-screens/select-screens.component';
import {SourceToggleComponent} from './source-toggle/source-toggle.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {StreamToggleComponent} from './stream-toggle/stream-toggle.component';
import {PinFormComponent} from './pin-form/pin-form.component';
import {SkyComponent} from './sky/sky.component';
import {UrlShortenerComponent} from './url-shortener/url-shortener.component';

@NgModule({
    declarations: [
        MainPageComponent,
        PinFormComponent,
        SelectScreensComponent,
        SkyComponent,
        StreamToggleComponent,
        SourceToggleComponent,
        UrlShortenerComponent,
    ],
    exports: [MainPageComponent],
    imports: [BrowserModule, FormsModule],
})
export class MainPageModule { }
