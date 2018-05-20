import {NgModule} from '@angular/core';
import {MainPageComponent} from './main.page';
import {SelectScreensComponent} from './select-screens/select-screens.component';
import {SourceToggleComponent} from './source-toggle/source-toggle.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {StreamToggleComponent} from './stream-toggle/stream-toggle.component';

@NgModule({
    declarations: [MainPageComponent, SelectScreensComponent, StreamToggleComponent, SourceToggleComponent],
    exports: [MainPageComponent],
    imports: [BrowserModule, FormsModule],
})
export class MainPageModule { }
