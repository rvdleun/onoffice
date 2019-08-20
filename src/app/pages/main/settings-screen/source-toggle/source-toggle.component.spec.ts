import {SourceSelection, SourceToggleComponent} from './source-toggle.component';
import {TestBed} from '@angular/core/testing';

describe('SourceToggleComponent', () => {
    let component: SourceToggleComponent;
    let source: SourceSelection;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SourceToggleComponent],
        });

        source = { source: 'blaaa', selected: false, scale: 1 };
        component = TestBed.createComponent(SourceToggleComponent).componentInstance;
        component.source = source;
    });

    it('should be defined', () => expect(component).toBeDefined() );

    it('should change the selected variable when toggling the source', () => {
        component.onToggle();
        expect(source.selected).toBe(true);
        component.onToggle();
        expect(source.selected).toBe(false);
        component.onToggle();
        component.onToggle();
        expect(source.selected).toBe(false);
    });
});
