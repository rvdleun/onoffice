import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';
import {SocketService} from './socket.service';
import {SourceSelection} from '../pages/main/settings-screen/source-toggle/source-toggle.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface AppStatus {
    current: 'inactive' | 'setting-up' | 'waiting-for-client' | 'active';
}

@Injectable()
export class StreamService {
    public statusSubject: BehaviorSubject<AppStatus> = new BehaviorSubject<AppStatus>({ current: 'inactive' });
    private pc: RTCPeerConnection;

    constructor(private electronService: ElectronService, private socketService: SocketService) { }

    public startStreaming(sources: SourceSelection[]) {
        this.statusSubject.next({current: 'waiting-for-client'});
        this.socketService.initialize();

        this.electronService.remote.getGlobal('setWebServerActive')(true);

        this.socketService.emit('host', this.electronService.remote.getGlobal('sessionId'));
        this.socketService.on('start', () => this.setupConnection(sources));
    }

    public stopStreaming() {
        this.statusSubject.next({current: 'inactive'});
        this.electronService.remote.getGlobal('setWebServerActive')(false);

        this.socketService.removeAllListeners('start');

        if (this.pc) {
            this.pc.close();
        }
    }

    private setupConnection(sources: SourceSelection[]) {
        const pc = new RTCPeerConnection(
            {
                iceServers:
                    [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }]
            });

        sources.forEach((source) => {
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

                if (pc.getLocalStreams().length === sources.length) {
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
                this.statusSubject.next({ current: 'active' });
            }

            if (event.currentTarget['iceConnectionState'] === 'disconnected') {
                this.statusSubject.next({ current: 'waiting-for-client' });
            }
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