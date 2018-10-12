import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SourceSelection} from './settings-screen/source-toggle/source-toggle.component';
import {SocketService} from '../../shared/socket.service';
import {StreamService} from '../../shared/stream.service';

@Component({
    selector: 'app-page-main',
    styleUrls: ['./main.page.css'],
    templateUrl: './main.page.html'
})
export class MainPageComponent {
    public activeScreen: 'settings' | 'streaming' = 'settings';

    constructor(streamService: StreamService) {
        streamService.statusSubject.subscribe((status) => {
            if (status.current === 'inactive') {
                this.activeScreen = 'settings';
            } else if (this.activeScreen === 'settings') {
                this.activeScreen = 'streaming';
            }
        });
    }
}