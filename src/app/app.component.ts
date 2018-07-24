import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {SocketService} from './shared/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  public ngOnInit() {
  }
}
