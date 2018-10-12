import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {SettingsScreenModule} from './settings-screen/settings.screen.module';
import {MainPageComponent} from './main.page';

@NgModule({
    declarations: [MainPageComponent],
    exports: [MainPageComponent],
    imports: [BrowserModule, FormsModule, SettingsScreenModule],
})
export class MainPageModule { }
