import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ElectronService} from 'ngx-electron';

type ShortenerData = {
    id: string;
}

@Component({
    selector: 'app-url-shortener',
    template: '<p *ngIf="url">URL Shortener: {{ url }}</p>'
})
export class UrlShortenerComponent implements OnInit {
    public url: string = '';

    private readonly api = 'http://trlvr.nl/office';

    constructor(private electronService: ElectronService, private http: HttpClient) { }

    public ngOnInit() {
        const ip = this.electronService.remote.getGlobal('IP');
        const url = `${this.api}/api.php?request&url=http://${ip}`;

        this.http.get(url).subscribe((result: ShortenerData) => {
            this.url = `${this.api}?${result.id}`;
        });
    }
}