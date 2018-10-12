import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-stream-toggle',
    styleUrls: ['./stream-toggle.component.scss'],
    templateUrl: 'stream-toggle.component.html'
})
export class StreamToggleComponent {
    @Output() startStreaming: EventEmitter<null> = new EventEmitter<null>();

    public onClick() {
        this.startStreaming.next();
    }
}
