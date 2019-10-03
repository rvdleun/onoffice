import {Component, Input} from '@angular/core';
import {SocketService} from '../../../../shared/socket.service';
import {SourceSelection} from '../../settings-screen/source-toggle/source-toggle.component';

@Component({
    selector: 'app-center-screen',
    styleUrls: ['./center-screen.component.css'],
    template: '<button type="button" class="btn" (click)="onClick()">Center Screen</button>\n'
})
export class CenterScreenComponent {
    @Input() source: SourceSelection;

    constructor(public socketService: SocketService) { }

    public onClick() {
        console.log(this.source);
        this.socketService.emit('center-screen', { streamId: this.source.streamId });
    }
}
