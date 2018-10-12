import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-start-streaming',
    styleUrls: ['./start-streaming.component.scss'],
    templateUrl: 'start-streaming.component.html'
})
export class StartStreamingComponent {
    @Output() startStreaming: EventEmitter<null> = new EventEmitter<null>();

    public onClick() {
        this.startStreaming.next();
    }
}
