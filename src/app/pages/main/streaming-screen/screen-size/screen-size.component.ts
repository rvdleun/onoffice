import {Component} from '@angular/core';
import {SocketService} from '../../../../shared/socket.service';

@Component({
    selector: 'app-screen-size',
    styleUrls: ['./screen-size.component.css'],
    template: '<p>Screen size</p><input type="range" min=".5" max="2" step=".1" (input)="onInput()" [(ngModel)]="sourceScale" />'
})
export class ScreenSizeComponent {
    public sourceScale: number = 1.3;

    constructor(public socketService: SocketService) { }

    public onInput() {
        this.socketService.emit('source-scale', this.sourceScale);
    }
}
