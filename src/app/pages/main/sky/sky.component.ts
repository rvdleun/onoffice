import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-sky',
    styleUrls: ['./sky.component.css'],
    templateUrl: './sky.component.html',
})
export class SkyComponent implements OnInit {
    backgroundImage: string;

    constructor(public electronService: ElectronService) { }

    public ngOnInit() {
        this.electronService.remote.getGlobal('getSky')((sky) => {
            this.backgroundImage = `url(${sky})`;
        });
    }
}
