import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-connect-instructions',
    styleUrls: ['connect-instructions.component.css'],
    templateUrl: 'connect-instructions.component.html'
})
export class ConnectInstructionsComponent implements OnInit {
    @Input() ip: string;

    public sslActive = false;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private electronService: ElectronService
    ) { }

    public ngOnInit() {
        this.electronService.remote.getGlobal('getSslFromStorage')((ssl) => {
            this.sslActive = ssl;
            this.changeDetectorRef.detectChanges();
        });
    }
}
