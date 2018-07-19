import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-pin-form',
    styleUrls: ['./pin-form.component.css'],
    templateUrl: './pin-form.component.html'
})
export class PinFormComponent implements OnInit {
    @Input() disabled: boolean;

    public pin: string[] = [];
    @ViewChild('input') input: ElementRef;

    constructor(private changeDetectorRef: ChangeDetectorRef, private electronService: ElectronService) { }

    public ngOnInit() {
        this.electronService.remote.getGlobal('getPinFromStorage')((pin) => {
            this.pin = pin.split('');
            this.changeDetectorRef.detectChanges();
        });
    }

    public onBlur() {
        if(this.pin.length < 4) {
            this.pin = [];
        }

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