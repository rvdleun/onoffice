import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StreamService} from '../../../../shared/stream.service';
import {SourceSelection} from '../source-toggle/source-toggle.component';

@Component({
    selector: 'app-start-streaming',
    styleUrls: ['./start-streaming.component.scss'],
    templateUrl: 'start-streaming.component.html'
})
export class StartStreamingComponent {
    @Input() sources: SourceSelection[];

    constructor(public streamService: StreamService) { }

    public onClick() {
        this.streamService.startStreaming(this.sources.filter((source) => source.selected));
    }
}
