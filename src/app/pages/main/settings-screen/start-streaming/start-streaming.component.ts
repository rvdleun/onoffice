import {Component, Input} from '@angular/core';
import {StreamService} from '../../../../shared/stream.service';
import {SourceSelection} from '../source-toggle/source-toggle.component';
import {PeerService} from '../../../../shared/peer.service';

@Component({
    selector: 'app-start-streaming',
    styleUrls: ['./start-streaming.component.scss'],
    templateUrl: 'start-streaming.component.html'
})
export class StartStreamingComponent {
    @Input() sources: SourceSelection[];

    constructor(
        public peerService: PeerService,
        public streamService: StreamService
    ) { }

    public onClick() {
        const selectedSources = this.sources.filter((source) => source.selected);

        if (selectedSources.length === 0) {
            alert('You need to have one display toggled to start streaming.');
            return;
        }

        const sources = this.sources.filter((source) => source.selected);
        this.peerService.initialize(sources);
        this.streamService.startStreaming();
    }
}
