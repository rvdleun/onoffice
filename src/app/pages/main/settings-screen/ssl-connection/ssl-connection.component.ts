import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-ssl-connection',
    styleUrls: ['./ssl-connection.component.css'],
    templateUrl: 'ssl-connection.component.html'
})
export class SslConnectionComponent implements OnInit {
    @Input() sslConnection = true;

    @Output() sslConnectionChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private changeDetectorRef: ChangeDetectorRef, private electronService: ElectronService) { }

    public ngOnInit() {
        this.electronService.remote.getGlobal('getSslFromStorage')((ssl) => {
            this.sslConnection = ssl;
            this.changeDetectorRef.detectChanges();
        });
    }

    public onClick() {
        this.sslConnection = !this.sslConnection;
        this.sslConnectionChange.emit(this.sslConnection);
        this.electronService.remote.getGlobal('setSsl')(this.sslConnection);
    }
}
