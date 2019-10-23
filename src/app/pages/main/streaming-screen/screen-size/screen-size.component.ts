import {Component, Input} from '@angular/core';
import {SourceSelection} from '../../settings-screen/source-toggle/source-toggle.component';
import {PeerService} from '../../../../shared/peer.service';

@Component({
    selector: 'app-screen-size',
    styleUrls: ['./screen-size.component.css'],
    template: '<p>Screen size</p><input type="range" min=".5" max="2" step=".1" (input)="onInput()" [(ngModel)]="source.scale" />'
})
export class ScreenSizeComponent {
    @Input() source: SourceSelection;
    public sourceScale: number = 1;

    constructor(public peerService: PeerService) { }

    public onInput() {
        this.peerService.emit('source-scale', {streamId: this.source.streamId, scale: this.source.scale});
    }
}
