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
    public ip = 'Unknown';
    public status: AppStatus;
    public sourceScale: number = 1;

    constructor(private electronService: ElectronService, private socketService: SocketService, private streamService: StreamService) {
        this.streamService.statusSubject.subscribe((status) => {
            this.status = status;
        });
        this.ip = this.electronService.remote.getGlobal('IP');
    }

    public onSourceScaleChange() {
        this.socketService.emit('source-scale', this.sourceScale);
    }

}