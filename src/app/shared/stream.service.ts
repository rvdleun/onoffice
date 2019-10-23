import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface AppStatus {
    current: 'inactive' | 'setting-up' | 'waiting-for-client' | 'active' | 'unable-to-determine-ip';
}

@Injectable()
export class StreamService {
    public statusSubject: BehaviorSubject<AppStatus> = new BehaviorSubject<AppStatus>({ current: 'inactive' });

    constructor(
        private electronService: ElectronService,
    ) { }

    public startStreaming() {
        this.electronService.remote.getGlobal('setWebServerActive')(true);
        this.statusSubject.next({current: 'waiting-for-client'});
    }

    public stopStreaming() {
        this.statusSubject.next({current: 'inactive'});
        this.electronService.remote.getGlobal('setWebServerActive')(false);
    }
}
