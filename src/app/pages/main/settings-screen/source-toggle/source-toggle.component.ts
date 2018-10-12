import {Component, Input, OnInit} from '@angular/core';

export interface SourceSelection {
    source: any;
    selected: boolean;
}

@Component({
    selector: 'app-source-toggle',
    styleUrls: ['./source-toggle.component.scss'],
    templateUrl: 'source-toggle.component.html'
})
export class SourceToggleComponent implements OnInit {
    @Input() source: SourceSelection;

    public thumbnail: string;

    public ngOnInit() {
        this.thumbnail = this.source.source.thumbnail.toDataURL();
    }

    public onToggle() {
        this.source.selected = !this.source.selected;
    }
}
