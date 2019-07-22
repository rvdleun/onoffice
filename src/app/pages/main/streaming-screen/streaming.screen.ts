import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AppStatus, StreamService} from '../../../shared/stream.service';
import * as introJs from 'intro.js/intro';
import {Subscription} from 'rxjs';
import {ElectronService} from 'ngx-electron';
import {SourceSelection} from '../settings-screen/source-toggle/source-toggle.component';

@Component({
    selector: 'app-screen-streaming',
    styleUrls: ['./streaming.screen.css'],
    templateUrl: './streaming.screen.html'
})
export class StreamingScreen implements OnInit, OnDestroy {
    @Input()
    public sources: SourceSelection[];
    public errorMessage: string;
    public ip: string;
    public status: AppStatus;

    private statusSubscription: Subscription;

    constructor(private electronService: ElectronService, private streamService: StreamService) { }

    public ngOnInit() {
        this.statusSubscription = this.streamService.statusSubject.subscribe((status) => {
            this.errorMessage = null;
            this.status = status;
        });

        const ip = this.electronService.remote.getGlobal('getInternalIP')();
        if (ip) {
            this.ip = ip;
        } else {
            this.streamService.statusSubject.next({ current: 'unable-to-determine-ip' });
            this.errorMessage = 'Unable to get the internal IP Address. Are you connected to a network?';
        }
    }

    public ngOnDestroy() {
        this.statusSubscription.unsubscribe();
    }

    public startTutorial() {
        introJs().start();
    }
}
