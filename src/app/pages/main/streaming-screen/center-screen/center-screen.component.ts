import {Component} from '@angular/core';
import {SocketService} from '../../../../shared/socket.service';

@Component({
    selector: 'app-center-screen',
    styleUrls: ['./center-screen.component.css'],
    template: '<button type="button" class="btn" (click)="onClick()">Center Screen</button>\n'
})
export class CenterScreenComponent {
    constructor(public socketService: SocketService) {
    }

    public onClick() {
        this.socketService.emit('center-screen');
    }
}