import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-pin-form',
    styleUrls: ['./pin-form.component.css'],
    templateUrl: './pin-form.component.html'
})
export class PinFormComponent {
    @Input() disabled: boolean;

    public pin: string[] = [];
    @ViewChild('input') input: ElementRef;

    constructor(private electronService: ElectronService) { }

    public onBlur() {
        if(this.pin.length < 4) {
            this.pin = [];
        }

        console.log(this.electronService, this.electronService.remote, this.electronService.remote.getGlobal);
        this.electronService.remote.getGlobal('setPin')(this.pin.join(''));
    }

    public onClick() {
        this.input.nativeElement.focus();
    }

    public onKeyUp(event: KeyboardEvent) {
        if (event.code.indexOf('Digit') !== -1) {
            this.addDigit(event.key);
        }

        if (event.code === 'Backspace') {
            this.removeDigit();
        }
    }

    public addDigit(digit: string) {
        if (this.pin.length < 4) {
            this.pin.push(digit);
        }
    }

    public removeDigit() {
        this.pin.pop();
    }
}