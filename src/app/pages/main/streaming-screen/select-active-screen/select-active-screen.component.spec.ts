import {SelectActiveScreenComponent} from './select-active-screen.component';
import {TestBed} from '@angular/core/testing';
import {SocketService} from '../../../../shared/socket.service';

describe('SelectActiveScreenComponent', () => {
    let component: SelectActiveScreenComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SelectActiveScreenComponent],
            providers: [{ provide: SocketService, useValue: jasmine.createSpyObj('SocketService', ['emit']) }],
        });

        component = TestBed.createComponent(SelectActiveScreenComponent).componentInstance;
        component.sources = [
            { source: 'source #1', selected: true, scale: 1 },
            { source: 'source #2', selected: false, scale: 1 },
            { source: 'source #3', selected: true, scale: 1 },
            { source: 'source #4', selected: true, scale: 1 },
        ]
    });

    it('should be defined', () => expect(component).toBeDefined() );

    it('should set and emit the right source when changing the selected one', () => {
        spyOn(component.selected, 'emit');

        component.changeSelected(1);
        expect(component.selected.emit).toHaveBeenCalledWith(component.sources[2]);
        component.changeSelected(-1);
        expect(component.selected.emit).toHaveBeenCalledWith(component.sources[0]);
        component.changeSelected(-1);
        expect(component.selected.emit).toHaveBeenCalledWith(component.sources[3]);
        component.changeSelected(-1);
        expect(component.selected.emit).toHaveBeenCalledWith(component.sources[2]);
        component.changeSelected(-1);
        expect(component.selected.emit).toHaveBeenCalledWith(component.sources[0]);
    });
});
