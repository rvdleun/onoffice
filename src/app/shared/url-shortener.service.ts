import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../environments/environment';

type RedirectData = {
    ip: string;
    token: string;
};

type RedirectResult = {
    code: string;
    token: string;
};

@Injectable()
export class UrlShortenerService {
    public codeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(public electronService: ElectronService, private http: HttpClient) { }

    public getCode() {
        return new Promise((resolve) => {
            let done = false;

            this.getData().then((data) => {
                let url = `${environment.urlShortenerUrl}?ip=${data.ip}`;
                if (data.token) {
                    url += `&token=${data.token}`;
                }
                this.http.post(url, null).subscribe((result: RedirectResult) => {
                    if (result.code) {
                        this.codeSubject.next(result.code);
                        this.electronService.remote.getGlobal('setRedirectToken')(result.token);
                    } else {
                        this.codeSubject.next(null);
                        this.electronService.remote.getGlobal('clearRedirectToken')();
                    }

                    done = true;
                    resolve();
                }, () => {
                    done = true;
                    this.electronService.remote.getGlobal('clearRedirectToken')();
                    this.codeSubject.next(null);
                    resolve();
                });
            });

            setTimeout(() => {
                if (!done) {
                    resolve();
                }
            }, 3000);
        });
    }

    private getData(): Promise<RedirectData> {
        return new Promise((resolve) => {
            this.electronService.remote.getGlobal('getRedirectData')((data: RedirectData) => resolve(data));
        });
    }
}