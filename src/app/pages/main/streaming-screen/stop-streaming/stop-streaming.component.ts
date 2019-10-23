import {Component} from '@angular/core';
import {StreamService} from '../../../../shared/stream.service';
import {PeerService} from '../../../../shared/peer.service';

@Component({
    selector: 'app-stop-streaming',
    styleUrls: ['./stop-streaming.component.scss'],
    templateUrl: 'stop-streaming.component.html'
})
export class StopStreamingComponent {
    constructor(
        public peerService: PeerService,
        public streamService: StreamService
    ) { }

    public onClick() {
        this.peerService.emit('stop-streaming');
        this.peerService.destroy();
        this.streamService.stopStreaming();
    }
}
