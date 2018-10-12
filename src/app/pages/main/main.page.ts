import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SourceSelection} from './settings-screen/source-toggle/source-toggle.component';
import {SocketService} from '../../shared/socket.service';

@Component({
    selector: 'app-page-main',
    styleUrls: ['./main.page.css'],
    templateUrl: './main.page.html'
})
export class MainPageComponent {}