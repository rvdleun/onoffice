import {Component, Input, OnInit} from '@angular/core';
import {SourceSelection} from '../../settings-screen/source-toggle/source-toggle.component';
import * as introJs from 'intro.js/intro';

@Component({
    selector: 'app-source-controls',
    styleUrls: ['source-controls.component.css'],
    templateUrl: 'source-controls.component.html'
})
export class SourceControlsComponent implements OnInit {
    @Input() sources: SourceSelection[];

    public selectedSource: SourceSelection;

    public ngOnInit() {
        this.selectedSource = this.sources[0];
    }

    public onSelectedSource(selectedSource: SourceSelection) {
        this.selectedSource = selectedSource;
    }

    public startTutorial() {
        introJs().start();
    }
}
