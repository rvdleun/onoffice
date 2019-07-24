import {StartStreamingComponent} from './start-streaming.component';
import {TestBed} from '@angular/core/testing';
import {StreamService} from '../../../../shared/stream.service';

describe('StartStreamingComponent', () => {
    let component: StartStreamingComponent;

    const streamServiceMock = jasmine.createSpyObj('StreamService', ['startStreaming']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [StartStreamingComponent],
            providers: [{ provide: StreamService, useValue: streamServiceMock }],
        });

        component = TestBed.createComponent(StartStreamingComponent).componentInstance;

        spyOn(window, 'alert');
    });

    it('should be defined', () => expect(component).toBeDefined() );

    describe('When clicking the button', () => {
        describe('with no sources selected', () => {
            beforeEach(() => {
                component.sources = [
                    { scale: 1, source: {}, selected: false },
                    { scale: 1, source: {}, selected: false },
                    { scale: 1, source: {}, selected: false },
                ];
                component.onClick();
            });

            it('should show an alert and not start streaming', () => {
                expect(window.alert).toHaveBeenCalledWith('You need to have one display toggled to start streaming.');
                expect(streamServiceMock.startStreaming).not.toHaveBeenCalled();
            });
        });

        describe('with sources selected', () => {
            let sources;

            beforeEach(() => {
                sources = [
                    { scale: 1, source: {}, selected: true },
                    { scale: 1, source: {}, selected: false },
                    { scale: 1, source: {}, selected: true },
                ];

                component.sources = sources;
                component.onClick();
            });

            it('should start streaming with the selected sources', () => {
                expect(streamServiceMock.startStreaming).toHaveBeenCalledWith([sources[0], sources[2]]);
            });
        });
    });
});
