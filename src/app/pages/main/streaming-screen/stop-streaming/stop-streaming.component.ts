import {Component} from '@angular/core';
import {StreamService} from '../../../../shared/stream.service';

@Component({
    selector: 'app-stop-streaming',
    styleUrls: ['./stop-streaming.component.scss'],
    templateUrl: 'stop-streaming.component.html'
})
export class StopStreamingComponent {
    constructor(public streamService: StreamService) { }

    public onClick() {
        this.streamService.stopStreaming();
    }
}
