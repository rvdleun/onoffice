import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {SettingsScreenModule} from './settings-screen/settings.screen.module';
import {MainPageComponent} from './main.page';
import {StreamingScreenModule} from './streaming-screen/streaming.screen.module';

@NgModule({
    declarations: [MainPageComponent],
    exports: [MainPageComponent],
    imports: [BrowserModule, FormsModule, SettingsScreenModule, StreamingScreenModule],
})
export class MainPageModule { }
