import {Component, Input, OnInit} from '@angular/core';
import {SourceSelection} from '../source-toggle/source-toggle.component';

@Component({
    selector: 'app-select-screens',
    templateUrl: 'select-screens.component.html'
})
export class SelectScreensComponent {
    @Input() sources: SourceSelection[] = [];
    @Input() disabled: boolean;
}
