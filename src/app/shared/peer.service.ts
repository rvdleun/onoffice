import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import * as SimplePeer from 'simple-peer';
import {SourceSelection} from '../pages/main/settings-screen/source-toggle/source-toggle.component';

@Injectable()
export class PeerService {
    public onConnection: Function = () => {};
    public peer: SimplePeer;

    constructor(
        private electronService: ElectronService
    ) { }

    public async initialize(sources: SourceSelection[]) {
        const n = <any>navigator;
        const stream = await n.mediaDevices.getUserMedia({
            audio: false,
            video: {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: sources[0].source.id,
                },
            }
        });
        this.electronService.remote.require('./components/virtual-cursor.component').registerDisplay(sources[0].source.id, stream.id);

        const peer = new SimplePeer({ stream });

        peer.on('connect', () => {
            this.electronService.remote.getGlobal('watchVirtualCursor')();
        });

        peer.on('data', (data) => {
            console.log('Got this message', data);
            this.electronService.remote.getGlobal('onPeerMessage')(JSON.parse(data.toString()));
        });

        peer.on('signal', (signal) => {
            this.electronService.remote.getGlobal('sendSignal')(signal);
        });

        this.electronService.remote.getGlobal('onSendPeerMessageFunc')((event: string, data: any) => {
            console.log('Gonna send', {event, data});
            this.peer.send(JSON.stringify({ event, data }))
        });

        this.electronService.remote.getGlobal('onSignal')((signal) => {
            peer.signal(signal);
        });

        this.peer = peer;
    }

    private async setupConnection(source: SourceSelection) {
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
        source.streamId = stream.id;

        this.peer.send('Have omse dats');
        this.peer.addStream(stream);
        this.electronService.remote.require('./components/virtual-cursor.component').registerDisplay(source.source.id, stream.id);
    }
}
