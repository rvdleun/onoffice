import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {SourceSelection} from '../source-toggle/source-toggle.component';

@Component({
    selector: 'app-select-screens',
    styleUrls: ['select-screens.component.css'],
    templateUrl: 'select-screens.component.html'
})
export class SelectScreensComponent implements OnInit {
    @Input() sources: SourceSelection[] = [];
    @Input() disabled: boolean;

    public selectedSource: number = 0;
    public showArrows: boolean = false;

    constructor(public changeDetectorRef: ChangeDetectorRef) { }

    public ngOnInit() {
        this.showArrows = this.sources.length > 1;
    }

    public changeSelected(change: number) {
        let newSource = this.selectedSource + change;

        if (newSource < 0) {
            newSource = this.sources.length - 1;
        } else if (newSource >= this.sources.length) {
            newSource = 0;
        }

        this.selectedSource = newSource;
        this.changeDetectorRef.detectChanges();
    }
}
