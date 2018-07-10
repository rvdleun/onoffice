import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SourceSelection} from './source-toggle/source-toggle.component';

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

    constructor(private electronService: ElectronService) {
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
            console.log(this.sources);
        });
        this.ip = this.electronService.remote.getGlobal('IP');
    }
}