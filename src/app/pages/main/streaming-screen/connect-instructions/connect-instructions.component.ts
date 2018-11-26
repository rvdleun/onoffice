import {Component, Input, OnInit} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {UrlShortenerService} from '../../../../shared/url-shortener.service';

type Step = {
    code: string;
    ip: string;
};

type Instructions = {
    hasImages: boolean;
    id: string,
    title: string,
    steps: (Step | string)[],
};

@Component({
    selector: 'app-connect-instructions',
    styleUrls: ['connect-instructions.component.css'],
    templateUrl: 'connect-instructions.component.html'
})
export class ConnectInstructionsComponent implements OnInit {
    @Input() public mode: 'code' | 'ip' = null;

    public selectedHeadset: string;
    public readonly instructions: Instructions[] = [
        {
            hasImages: true,
            id: 'cardboard-android',
            title: 'Cardboard (Android)',
            steps: [
                'Join the same network as this computer.',
                'Open the chrome browser',
                {
                    code: 'Browse to http://openoffice.org/code and enter code *CODE*.',
                    ip: 'Browse to http://*IP*.',
                },
                'Press the \'Enter Office\' button.'
            ],
        },
        {
            hasImages: false,
            id: 'oculus-go',
            title: 'Oculus Go',
            steps: [
                'Join the same network as this computer.',
                'Open the Oculus browser',
                {
                    code: 'Browse to http://openoffice.org/code and enter code *CODE*.',
                    ip: 'Browse to http://*IP*. Note that http:// is required!',
                },
                'Press the \'Enter Office\' button.'
            ],
        },
        {
            hasImages: true,
            id: 'htc-vive',
            title: 'HTC Vive',
            steps: [
                'Open an Internet browser(Edge, Chrome or Firefox)',
                'If the Vive is connected to this computer, browse to http://localhost:24242.',
                {
                    code: 'If not, browse to http://openoffice.org/code and enter code *CODE*.',
                    ip: 'If not, browse to http://*IP*.',
                },
                'Press the \'Enter Office\' button.'
            ],
        },
    ];
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