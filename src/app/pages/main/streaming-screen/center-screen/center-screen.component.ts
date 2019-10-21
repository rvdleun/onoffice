import {Component, Input} from '@angular/core';
import {SourceSelection} from '../../settings-screen/source-toggle/source-toggle.component';
import {PeerService} from '../../../../shared/peer.service';

@Component({
    selector: 'app-center-screen',
    styleUrls: ['./center-screen.component.css'],
    template: '<button type="button" class="btn" (click)="onClick()">Center Screen</button>\n'
})
export class CenterScreenComponent {
    @Input() source: SourceSelection;

    constructor(public peerService: PeerService) { }

    public onClick() {
        console.log(this.source);
        this.peerService.emit('center-screen', { streamId: this.source.streamId });
    }
}
