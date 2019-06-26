import {Component} from '@angular/core';
import {ElectronService} from 'ngx-electron';
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

    constructor(public electronService: ElectronService, public streamService: StreamService) {
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
            this.backgroundClass = screen === 'streaming' ? 'blue' : null;
            window.setTimeout(() => {
                this.active = true;
            }, 750);
        }, 1250);
    }
}
