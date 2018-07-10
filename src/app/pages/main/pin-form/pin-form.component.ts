import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'app-pin-form',
    styleUrls: ['./pin-form.component.css'],
    templateUrl: './pin-form.component.html'
})
export class PinFormComponent {
    public pin: string[] = [];
    @ViewChild('input') input: ElementRef;

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

        console.log(this.pin);
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