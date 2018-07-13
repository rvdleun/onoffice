import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SourceSelection} from './source-toggle/source-toggle.component';
import {SocketService} from '../../shared/socket.service';

export interface AppStatus {
    current: 'inactive' | 'setting-up' | 'waiting-for-client' | 'active';
}

@Component({
    selector: 'app-page-main',
    styleUrls: ['./main.page.css'],
    templateUrl: './main.page.html'
})
export class MainPageComponent implements OnInit {
    public sources: SourceSelection[];
    public status: AppStatus;
    public ip = 'Unknown';
    public streaming: boolean = false;
    public sourceScale: number = 1;

    constructor(private electronService: ElectronService, private socketService: SocketService) {
        this.status = {
            current: 'inactive',
        };
    }

    public ngOnInit() {
        this.electronService.desktopCapturer.getSources({ types: [ 'screen' ] }, (error, sources) => {
            this.sources = sources.map((source) => {
                return {
                    source,
                    selected: true,
                };
            });
        });
        this.ip = this.electronService.remote.getGlobal('IP');
    }

    public setStreaming(streaming: boolean) {
        this.streaming = streaming;
    }

    public onSourceScaleChange() {
        this.socketService.emit('source-scale', this.sourceScale);
    }
}