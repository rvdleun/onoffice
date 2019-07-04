import {Component, Input, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-connect-instructions',
    styleUrls: ['connect-instructions.component.css'],
    templateUrl: 'connect-instructions.component.html'
})
export class ConnectInstructionsComponent {
    @Input() ip: string;

    constructor() { }
}
