import {Component, Input, OnInit} from '@angular/core';

export interface SourceSelection {
    source: any;
    selected: boolean;
}

@Component({
    selector: 'app-source-toggle',
    templateUrl: 'source-toggle.component.html'
})
export class SourceToggleComponent {
    @Input() source: SourceSelection;
}