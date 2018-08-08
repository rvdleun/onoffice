import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {SourceSelection} from '../source-toggle/source-toggle.component';
import {SocketService} from '../../../shared/socket.service';
import {AppStatus} from '../main.page';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-stream-toggle',
    templateUrl: 'stream-toggle.component.html'
})
export class StreamToggleComponent {
    @Input() sources: SourceSelection[];
    @Input() status: AppStatus;
    @Output() streaming: EventEmitter<boolean> = new EventEmitter<boolean>();

    private pc: RTCPeerConnection;

    constructor(private changeDetectorRef: ChangeDetectorRef, private electronService: ElectronService, private socketService: SocketService) { }

    public onClick() {
        if (this.status.current === 'inactive') {
            this.startStreaming();
        } else {
            this.stopStreaming();
        }
    }

    private startStreaming() {
        this.socketService.initialize();

        this.streaming.next(true);

        this.electronService.remote.getGlobal('setWebServerActive')(true);

        this.socketService.emit('host', this.electronService.remote.getGlobal('sessionId'));
        this.socketService.on('start', () => this.setupConnection());

        this.changeDetectorRef.detectChanges();
    }

    private stopStreaming() {
        this.streaming.next(false);

        this.electronService.remote.getGlobal('setWebServerActive')(false);

        this.socketService.removeAllListeners('start');

        if (this.pc) {
            this.pc.close();
        }

        this.changeDetectorRef.detectChanges();
    }

    private setupConnection() {
        // alert('SETTING HER UP');

        this.status.current = 'waiting-for-client';
        this.changeDetectorRef.detectChanges();

        const pc = new RTCPeerConnection(
            {
                iceServers:
                    [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }]
            });

        const selectedSources = this.sources.filter((source) => source.selected);
        selectedSources.forEach((source) => {
            const n = <any>navigator;
            n.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: source.source.id,
                    }
                }
            }).then((stream) => {
                pc.addStream(stream);

                this.electronService.remote.require('./components/virtual-cursor.component').registerDisplay(source.source.id, stream.id);

                if (pc.getLocalStreams().length === selectedSources.length) {
                    pc.createOffer((description) => {
                        pc.setLocalDescription(description, () => {
                            this.socketService.emit('webrtc-message', {'sdp': description});
                        }, () => {
                            console.log('set description error');
                        });
                    }, (error) => {
                        console.log('Error', error);
                    });
                }
            });
        });

        pc.addEventListener('iceconnectionstatechange', (event) => {
            console.log(event.currentTarget['iceConnectionState'], event.currentTarget['iceConnectionState'] === 'completed');
            if (event.currentTarget['iceConnectionState'] === 'completed') {
                console.log('Setting er to active');
                this.status.current = 'active';
            }

            if (event.currentTarget['iceConnectionState'] === 'disconnected') {
                this.status.current = 'waiting-for-client';
            }

            this.changeDetectorRef.detectChanges();
        });

        pc.onicecandidate = (event) => {
            if (event.candidate != null) {
                this.socketService.emit('webrtc-message', {'ice': event.candidate});
            }
        };

        this.socketService.on('webrtc-message', (message) => {
            if (message.sdp) {
                pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
                    if (message.sdp.type === 'offer') {
                        pc.createAnswer((description) => {
                            pc.setLocalDescription(description, () => {
                                this.socketService.emit('webrtc-message', {'sdp': description});
                            }, () => {
                                console.log('set description error');
                            });
                        }, (error) => {
                            console.log(error);
                        });
                    }
                });
            } else if (message.ice) {
                pc.addIceCandidate(new RTCIceCandidate(message.ice));
            }
        });

        this.pc = pc;
    }
}
