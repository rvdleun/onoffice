import {Component} from '@angular/core';
import {AppStatus, StreamService} from '../../../../shared/stream.service';

@Component({
    selector: 'app-status',
    template: `Status:
        <span *ngIf="status.current === 'active'">Active</span>
        <span *ngIf="status.current === 'inactive'">Inactive</span>
        <span *ngIf="status.current === 'setting-up'">Setting up...</span>
        <span *ngIf="status.current === 'waiting-for-client'">Waiting for client</span>`,
})
export class StatusComponent {
    public status: AppStatus;

    constructor(private streamService: StreamService) {
        this.streamService.statusSubject.subscribe((status) => {
            this.status = status;
        });
    }
}