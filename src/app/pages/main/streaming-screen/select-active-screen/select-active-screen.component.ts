import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SourceSelection} from '../../settings-screen/source-toggle/source-toggle.component';
import {SocketService} from '../../../../shared/socket.service';

@Component({
    selector: 'app-select-screen',
    styleUrls: ['select-active-screen.component.css'],
    templateUrl: 'select-active-screen.component.html',
})
export class SelectActiveScreenComponent {
    @Input() sources: SourceSelection[];

    @Output() selected: EventEmitter<SourceSelection> = new EventEmitter<SourceSelection>();

    public currentSelected: number = 0;

    constructor(private socketService: SocketService) { }

    public changeSelected(change: number) {
        this.currentSelected+=change;

        if (this.currentSelected >= this.sources.length) {
            this.currentSelected = 0;
        } else if (this.currentSelected < 0) {
            this.currentSelected = this.sources.length - 1;
        }

        while (this.sources[this.currentSelected].selected === false) {
            if (change > 0) {
                this.currentSelected+=1;
            } else {
                this.currentSelected-=1;
            }
        }

        const selected = this.sources[this.currentSelected];
        this.selected.emit(selected);
        this.socketService.emit('source-select', { streamId: selected.streamId });

        console.log('source-select', { streamId: selected.streamId })
    }
}
