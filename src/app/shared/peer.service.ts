import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import * as SimplePeer from 'simple-peer';
import {SourceSelection} from '../pages/main/settings-screen/source-toggle/source-toggle.component';

interface PeerConnection {
    sessionId: string;
    peer: SimplePeer;
}

@Injectable()
export class PeerService {
    private connections: PeerConnection[] = [];
    private streams: MediaStream[] = [];

    constructor(
        private electronService: ElectronService
    ) {
        this.electronService.remote.getGlobal('onCreatePeerFunc')((id: string) => {
            this.createPeer(id);
        });

        this.electronService.remote.getGlobal('onClose')(() => {
            this.connections.forEach((connection) => connection.peer.destroy());
        });

        this.electronService.remote.getGlobal('onSendPeerMessageFunc')((event: string, data: any) => {
            this.connections.forEach((connection) => {
                connection.peer.send(JSON.stringify({ event, data }))
            });
        });

        this.electronService.remote.getGlobal('onSignal')((sessionId: string, signal: any) => {
            const connection = this.connections.find((connection) => connection.sessionId === sessionId);

            if (!connection) {
                return;
            }

            connection.peer.signal(signal);
        });
    }

    public initialize(sources: SourceSelection[]) {
        this.streams = [];

        sources.forEach(async (source) => {
            const n = <any>navigator;
            const stream = await n.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: source.source.id,
                    },
                }
            });
            this.electronService.remote.require('./components/virtual-cursor.component').registerDisplay(sources[0].source.id, stream.id);
            this.streams.push(stream);
        });
    }

    private createPeer(sessionId: string) {
        const peer = new SimplePeer({ streams: this.streams });

        peer.on('connect', () => {
            this.electronService.remote.getGlobal('watchVirtualCursor')();
        });

        peer.on('data', (data) => {
            this.electronService.remote.getGlobal('onPeerMessage')(JSON.parse(data.toString()));
        });

        peer.on('signal', (signal) => {
            this.electronService.remote.getGlobal('sendSignal')(sessionId, signal);
        });

        this.connections.push({sessionId, peer});
    }
}
