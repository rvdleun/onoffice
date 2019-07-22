import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';

export interface SourceSelection {
    scale: number;
    source: any;
    selected: boolean;
    streamId?: string;
}

@Component({
    selector: 'app-source-toggle',
    styleUrls: ['./source-toggle.component.scss'],
    templateUrl: 'source-toggle.component.html'
})
export class SourceToggleComponent implements OnChanges {
    @Input() source: SourceSelection;

    public thumbnail: string;

    constructor(public changeDetectorRef: ChangeDetectorRef) { }

    public ngOnChanges() {
        this.thumbnail = this.source.source.thumbnail.toDataURL();
    }

    public onToggle() {
        this.source.selected = !this.source.selected;
        this.changeDetectorRef.detectChanges();
    }
}
