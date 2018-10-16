import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SourceSelection} from './settings-screen/source-toggle/source-toggle.component';
import {SocketService} from '../../shared/socket.service';
import {StreamService} from '../../shared/stream.service';

type ScreenId = 'settings' | 'streaming';

@Component({
    selector: 'app-page-main',
    styleUrls: ['./main.page.css'],
    templateUrl: './main.page.html'
})
export class MainPageComponent {
    public activeScreen: ScreenId = null;
    public active: boolean = true;
    public backgroundClass: 'blue' | 'no-transition' = 'no-transition';

    constructor(streamService: StreamService) {
        streamService.statusSubject.subscribe((status) => {
            if (status.current === 'inactive') {
                this.transitionTo('settings');
            } else if (this.activeScreen === 'settings') {
                this.transitionTo('streaming');
            }
        });
    }

    private transitionTo(screen: ScreenId) {
        if (this.backgroundClass === 'no-transition') {
            this.activeScreen = screen;
            this.active = true;
            window.setTimeout(() => this.backgroundClass = null);
            return;
        }
        this.active = false;

        window.setTimeout(() => {
            this.backgroundClass = screen === 'streaming' ? 'blue' : null;
            this.activeScreen = screen;
            window.setTimeout(() => {
                this.active = true;
            }, 750);
        }, 1250);
    }
}