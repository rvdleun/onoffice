import {Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-connect-instructions',
    styleUrls: ['connect-instructions.component.css'],
    templateUrl: 'connect-instructions.component.html'
})
export class ConnectInstructionsComponent implements OnInit {
    private ip: string;

    constructor(public electronService: ElectronService) { }

    public ngOnInit() {
        this.ip = this.electronService.remote.getGlobal('IP');
    }
}
