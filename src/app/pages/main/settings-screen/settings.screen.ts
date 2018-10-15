import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SourceSelection} from './source-toggle/source-toggle.component';
import {SocketService} from '../../../shared/socket.service';
import {AppStatus, StreamService} from '../../../shared/stream.service';

@Component({
    selector: 'app-screen-settings',
    styleUrls: ['./settings.screen.css'],
    templateUrl: './settings.screen.html'
})
export class SettingsScreen implements OnInit {
    public sources: SourceSelection[];
    public status: AppStatus;
    public streaming: boolean = false;
    public sourceScale: number = 1;

    public fadeOut: boolean = false;

    constructor(private changeDetectorRef: ChangeDetectorRef, private electronService: ElectronService, public streamService: StreamService, private socketService: SocketService) {
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

            this.changeDetectorRef.detectChanges();
        });
    }

    public onSourceScaleChange() {
        this.socketService.emit('source-scale', this.sourceScale);
    }

    public centerScreen() {
        this.socketService.emit('center-screen');
    }
}