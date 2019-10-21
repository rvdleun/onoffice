import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SocketService} from './socket.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface AppStatus {
    current: 'inactive' | 'setting-up' | 'waiting-for-client' | 'active' | 'unable-to-determine-ip';
}

@Injectable()
export class StreamService {
    public statusSubject: BehaviorSubject<AppStatus> = new BehaviorSubject<AppStatus>({ current: 'inactive' });
    private pc: RTCPeerConnection;

    constructor(
        private electronService: ElectronService,
        private socketService: SocketService) { }

    public startStreaming() {
        this.electronService.remote.getGlobal('setWebServerActive')(true);
        this.statusSubject.next({current: 'waiting-for-client'});
    }

    public stopStreaming() {
        this.statusSubject.next({current: 'inactive'});
        this.electronService.remote.getGlobal('setWebServerActive')(false);

        this.socketService.emit('stop-streaming');
        this.socketService.removeAllListeners('start');
        this.socketService.destroy();

        if (this.pc) {
            this.pc.close();
        }
    }
}
