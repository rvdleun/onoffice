import {NgModule} from '@angular/core';
import {MainPageComponent} from '../main.page';
import {PinFormComponent} from './pin-form/pin-form.component';
import {SelectScreensComponent} from './select-screens/select-screens.component';
import {SkyComponent} from './sky/sky.component';
import {StreamToggleComponent} from './stream-toggle/stream-toggle.component';
import {SourceToggleComponent} from './source-toggle/source-toggle.component';
import {UrlShortenerComponent} from './url-shortener/url-shortener.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {SettingsScreen} from './settings.screen';


@NgModule({
    declarations: [
        SettingsScreen,

        PinFormComponent,
        SelectScreensComponent,
        SkyComponent,
        StreamToggleComponent,
        SourceToggleComponent,
        UrlShortenerComponent,
    ],
    exports: [SettingsScreen],
    imports: [BrowserModule, FormsModule],
})
export class SettingsScreenModule { }
