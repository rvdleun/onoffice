import {Component, Input} from '@angular/core';
import {SourceSelection} from '../source-toggle/source-toggle.component';

@Component({
    selector: 'app-select-screens',
    styleUrls: ['select-screens.component.css'],
    templateUrl: 'select-screens.component.html'
})
export class SelectScreensComponent {
    @Input() sources: SourceSelection[] = [];
    @Input() disabled: boolean;

    public changeSelected(change: number) {
        let index = -1;

        this.sources.forEach((source, i) => { if (source.selected ) { index = i; source.selected = false; }});
        index+=change;

        if (index < 0) {
            index = this.sources.length - 1;
        } else if (index >= this.sources.length) {
            index = 0;
        }

        this.sources[index].selected = true;
    }
}
