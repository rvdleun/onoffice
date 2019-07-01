import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    private socket;

    initialize() {
        this.socket = io.connect('http://localhost:24242');
    }

    emit(event: string, data: any = null) {
        this.socket.emit(event, data);
    }

    on(event: string, func: Function) {
        this.socket.on(event, func);
    }

    removeListener(event:string, func: Function) {
        this.socket.removeListener(event, func);
    }

    removeAllListeners(event: string) {
        this.socket.removeAllListeners(event);
    }

    destroy() {
        this.socket.destroy();
        delete this.socket;
        this.socket = null;
    }
}
