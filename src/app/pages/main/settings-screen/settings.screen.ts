import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SourceSelection} from './source-toggle/source-toggle.component';
import {SocketService} from '../../../shared/socket.service';
import {AppStatus, StreamService} from '../../../shared/stream.service';
import * as introJs from 'intro.js/intro.js';

@Component({
    selector: 'app-screen-settings',
    styleUrls: ['./settings.screen.css'],
    templateUrl: './settings.screen.html'
})
export class SettingsScreen {
    @Input()
    public sources: SourceSelection[];
    public status: AppStatus;
    public streaming: boolean = false;
    public sourceScale: number = 1;

    public fadeOut: boolean = false;

    constructor(public streamService: StreamService, private socketService: SocketService) {
        this.status = {
            current: 'inactive',
        };
    }

    public startTutorial() {
        introJs().start();
    }
}
