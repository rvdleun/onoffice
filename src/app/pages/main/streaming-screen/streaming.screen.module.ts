import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {StreamingScreen} from './streaming.screen';
import {StatusComponent} from './status/status.component';
import {StopStreamingComponent} from './stop-streaming/stop-streaming.component';
import {CenterScreenComponent} from './source-controls/center-screen/center-screen.component';
import {ScreenSizeComponent} from './source-controls/screen-size/screen-size.component';
import {ConnectInstructionsComponent} from './connect-instructions/connect-instructions.component';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent} from './error-message/error-message.component';
import {SelectActiveScreenComponent} from './source-controls/select-active-screen/select-active-screen.component';
import {SourceControlsComponent} from './source-controls/source-controls.component';

@NgModule({
    declarations: [
        StreamingScreen,

        CenterScreenComponent,
        ConnectInstructionsComponent,
        ErrorMessageComponent,
        ScreenSizeComponent,
        SourceControlsComponent,
        SelectActiveScreenComponent,
        StatusComponent,
        StopStreamingComponent,
    ],
    exports: [StreamingScreen],
    imports: [BrowserModule, CommonModule, FormsModule],
})
export class StreamingScreenModule { }
