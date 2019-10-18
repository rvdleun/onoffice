import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SocketService} from './socket.service';
import {SourceSelection} from '../pages/main/settings-screen/source-toggle/source-toggle.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {PeerService} from './peer.service';

declare var Peer;

export interface AppStatus {
    current: 'inactive' | 'setting-up' | 'waiting-for-client' | 'active' | 'unable-to-determine-ip';
}

@Injectable()
export class StreamService {
    public statusSubject: BehaviorSubject<AppStatus> = new BehaviorSubject<AppStatus>({ current: 'inactive' });
    private pc: RTCPeerConnection;

    constructor(
        private electronService: ElectronService,
        private peerService: PeerService,
        private socketService: SocketService) { }

    public startStreaming(sources: SourceSelection[]) {
        this.statusSubject.next({current: 'waiting-for-client'});

        this.electronService.remote.getGlobal('setWebServerActive')(true);

        this.peerService.initialize(sources);
        // this.socketService.initialize();
        // this.socketService.emit('host', this.electronService.remote.getGlobal('sessionId'));
        // this.socketService.on('client-id', (clientId) => sources.forEach((source) => this.setupConnection(clientId, source)));
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
