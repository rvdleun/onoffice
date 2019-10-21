import {Component, Input} from '@angular/core';
import {SourceSelection} from './source-toggle/source-toggle.component';
import * as introJs from 'intro.js/intro.js';

@Component({
    selector: 'app-screen-settings',
    styleUrls: ['./settings.screen.css'],
    templateUrl: './settings.screen.html'
})
export class SettingsScreen {
    @Input() sources: SourceSelection[];

    public startTutorial() {
        introJs().start();
    }
}
