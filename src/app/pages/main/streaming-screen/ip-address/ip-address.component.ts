import {Component} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-ip-address',
    template: `IP: {{ ip }}`,
})
export class IpAddressComponent {
    public ip: string;

    constructor(private electronService: ElectronService) {
        const ip = this.electronService.remote.getGlobal('IP');
        if (ip) {
            this.ip = ip;
        } else {
            this.ip = 'Unknown';
        }
    }
}