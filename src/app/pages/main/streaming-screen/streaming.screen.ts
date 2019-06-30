import {Component} from '@angular/core';
import {AppStatus, StreamService} from '../../../shared/stream.service';
import * as introJs from 'intro.js/intro';

@Component({
    selector: 'app-screen-streaming',
    styleUrls: ['./streaming.screen.css'],
    templateUrl: './streaming.screen.html'
})
export class StreamingScreen {
    status: AppStatus;
    constructor(private streamService: StreamService) {
        this.streamService.statusSubject.subscribe((status) => {
            this.status = status;
        });
    }

    public startTutorial() {
        introJs().start();
    }
}
