import {NgModule} from '@angular/core';
import {PinFormComponent} from './pin-form/pin-form.component';
import {SelectScreensComponent} from './select-screens/select-screens.component';
import {SkyComponent} from './sky/sky.component';
import {SourceToggleComponent} from './source-toggle/source-toggle.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {SettingsScreen} from './settings.screen';
import {StartStreamingComponent} from './start-streaming/start-streaming.component';
import {SslConnectionComponent} from './ssl-connection/ssl-connection.component';


@NgModule({
    declarations: [
        SettingsScreen,

        PinFormComponent,
        SelectScreensComponent,
        SkyComponent,
        SslConnectionComponent,
        StartStreamingComponent,
        SourceToggleComponent,
    ],
    exports: [SettingsScreen],
    imports: [BrowserModule, FormsModule],
})
export class SettingsScreenModule { }
