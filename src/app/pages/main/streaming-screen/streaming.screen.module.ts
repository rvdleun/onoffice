import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {StreamingScreen} from './streaming.screen';
import {StatusComponent} from './status/status.component';
import {StopStreamingComponent} from './stop-streaming/stop-streaming.component';
import {CenterScreenComponent} from './center-screen/center-screen.component';
import {ScreenSizeComponent} from './screen-size/screen-size.component';
import {ConnectInstructionsComponent} from './connect-instructions/connect-instructions.component';
import {CommonModule} from '@angular/common';
import {ErrorMessageComponent} from './error-message/error-message.component';

@NgModule({
    declarations: [
        StreamingScreen,

        CenterScreenComponent,
        ConnectInstructionsComponent,
        ErrorMessageComponent,
        ScreenSizeComponent,
        StatusComponent,
        StopStreamingComponent,
    ],
    exports: [StreamingScreen],
    imports: [BrowserModule, CommonModule, FormsModule],
})
export class StreamingScreenModule { }
