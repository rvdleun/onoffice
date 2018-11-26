import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SourceSelection} from './settings-screen/source-toggle/source-toggle.component';
import {SocketService} from '../../shared/socket.service';
import {StreamService} from '../../shared/stream.service';
import {UrlShortenerService} from '../../shared/url-shortener.service';

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

    constructor(public electronService: ElectronService, public streamService: StreamService, public urlShortenerService: UrlShortenerService) {
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
            window.setTimeout(() => {
                this.backgroundClass = null;
                this.electronService.remote.getGlobal('showWindow')();
            }, 250);
            return;
        }
        this.active = false;

        window.setTimeout(() => {
            this.activeScreen = screen;
            if (screen === 'streaming') {
                this.backgroundClass = 'blue';
                this.urlShortenerService.getCode().then(() => {
                    this.active = true;
                });
            } else {
                this.backgroundClass = null;
                window.setTimeout(() => {
                    this.active = true;
                }, 750);
            }
        }, 1250);
    }
}