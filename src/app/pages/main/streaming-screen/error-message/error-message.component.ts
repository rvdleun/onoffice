import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-error-message',
    styleUrls: ['./error-message.component.css'],
    templateUrl: 'error-message.component.html'
})
export class ErrorMessageComponent {
    @Input() message: string;
}
