import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {StreamService} from '../../../../shared/stream.service';
import {SourceSelection} from '../../settings-screen/source-toggle/source-toggle.component';

@Component({
    selector: 'app-add-window',
    styleUrls: ['./add-window.component.css'],
    templateUrl: 'add-window.component.html'
})
export class AddWindowComponent implements OnInit, OnDestroy {
    @Output() newWindow: EventEmitter<SourceSelection> = new EventEmitter<SourceSelection>();

    public selectedSource: any;
    public sources: any[] = [];

    private currentSelected: number = 0;
    private interval: any;

    constructor(private electronService: ElectronService, private streamService: StreamService) { }

    public ngOnInit() {
        this.interval = setInterval(() => this.updateSources(), 1000);

        this.updateSources();
        this.selectedSource = this.sources[this.currentSelected];
    }

    public ngOnDestroy() {
        clearInterval(this.interval);
    }

    public addWindow() {
        const newSource: SourceSelection = {
            scale: 1,
            source: this.selectedSource,
            selected: true,
            type: 'window',
        };

        this.streamService.addSource(newSource);
        this.newWindow.emit(newSource);
    }

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

        this.selectedSource = this.sources[this.currentSelected];
    }

    private updateSources() {
        this.electronService.desktopCapturer.getSources({ types: [ 'window' ] }, (error, sources) => {
            this.sources = this.sources.filter((source) => this.listHasSource(source.id, sources));

            sources.forEach((source) => {
                if (this.listHasSource(source.id, this.sources) === false) {
                    this.sources.push(source);
                }
            })

            this.changeSelected(0);
        });

        console.log(this.sources.length);
    }

    private listHasSource(id: string, list: any[]) {
        return list.some((source) => source.id === id)
    }
}
