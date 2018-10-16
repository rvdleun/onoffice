import {Component} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SocketService} from '../../../shared/socket.service';
import {AppStatus, StreamService} from '../../../shared/stream.service';

@Component({
    selector: 'app-screen-streaming',
    styleUrls: ['./streaming.screen.css'],
    templateUrl: './streaming.screen.html'
})
export class StreamingScreen {
}