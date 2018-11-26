import {Component, Input, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {UrlShortenerService} from '../../../../shared/url-shortener.service';
import {HeadsetInstructions, Instructions, Step} from './instructions';

@Component({
    selector: 'app-connect-instructions',
    styleUrls: ['connect-instructions.component.css'],
    templateUrl: 'connect-instructions.component.html'
})
export class ConnectInstructionsComponent implements OnInit {
    @Input() public mode: 'code' | 'ip' = null;

    public selectedHeadset: string;
    public readonly instructions: Instructions[] = HeadsetInstructions;
    private code: string;

    constructor(public electronService: ElectronService, public urlShortenerService: UrlShortenerService) { }

    public ngOnInit() {
        this.urlShortenerService.codeSubject.subscribe((code) => {
            console.log(code);
            this.code = code;
            this.mode = code ? 'code' : 'ip';

            this.instructions.forEach((headset) => {
                for (let i = 0; i<headset.steps.length; i++) {
                    headset.steps.forEach((step, index) => {
                        let data;
                        if (headset.steps[index]['ip']) {
                            data = headset.steps[index] as Step;
                            data.code = this.replaceText(data.code);
                            data.ip = this.replaceText(data.ip);
                        } else {
                            data = headset.steps[index] as string;
                            data = this.replaceText(data);
                        }

                        headset.steps[index] = data;
                    });
                }
            });
        });
    }

    private replaceText(text: string) {
        let ip = this.electronService.remote.getGlobal('IP');
        if (!ip) {
            ip = 'Unknown';
        }

        text = text.replace('*IP*', `<span style="text-decoration: underline">${ip}</span>`);

        if (this.code) {
            text = text.replace('*CODE*', `<span style="text-decoration: underline">${this.code}</span>`);
        }
        return text;
    }
}