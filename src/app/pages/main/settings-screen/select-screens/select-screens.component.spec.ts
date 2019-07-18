import {SelectScreensComponent} from './select-screens.component';
import {TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('SelectScreensComponent', () => {
    let component: SelectScreensComponent;

    let multipleSourcesList;
    let singleSourceList;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SelectScreensComponent],
            schemas: [NO_ERRORS_SCHEMA],
        });

        component = TestBed.createComponent(SelectScreensComponent).componentInstance;

        multipleSourcesList = [{ source: 'source-1', selected: true }, { source: 'source-2', selected: true }, { source: 'source-3', selected: true }];
        singleSourceList = [{ source: 'source-1', selected: true }];
    });

    it('should be defined', () => expect(component).toBeDefined());

    describe('On initializing', () => {
        describe('and there is only one source', () => {
            beforeEach(() => {
                component.sources = singleSourceList;
                component.ngOnInit();
            });

            it('should set showArrows to false', () => {
                expect(component.showArrows).toBe(false);
            });
        });

        describe('and there are multiple sources', () => {
            beforeEach(() => {
                component.sources = multipleSourcesList;
                component.ngOnInit();
            });

            it('should set showArrows to true', () => {
                expect(component.showArrows).toBe(true);
            });
        });
    });

    describe('When changing the selected source', () => {
        beforeEach(() => {
            component.sources = multipleSourcesList;
        });

        it('should update the selected source', () => {
            component.selectedSource = 1;
            component.changeSelected(1);
            expect(component.selectedSource).toBe(2);
            component.changeSelected(-2);
            expect(component.selectedSource).toBe(0);
        });

        it('should be able to go to the start or end of the list', () => {
            component.selectedSource = 0;
            component.changeSelected(-1);
            expect(component.selectedSource).toBe(2);
            component.changeSelected(1);
            expect(component.selectedSource).toBe(0);
            component.changeSelected(-10);
            expect(component.selectedSource).toBe(2);
            component.changeSelected(50);
            expect(component.selectedSource).toBe(0);
        });
    });
});
