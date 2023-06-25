import { Component, Input } from '@angular/core';
import { HttpService } from '../service/http-service.service';
import { webSocket, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { LoginData } from '../model/login-data';

interface LogData {
  type: string;
  payload: string;
}

@Component({
  selector: 'app-log-monitor',
  templateUrl: './log-monitor.component.html',
  styleUrls: ['./log-monitor.component.css']
})
export class LogMonitorComponent {
  logs: LogData[];

  constructor(private service: HttpService, login: LoginData) {
    this.logs = new Array();
    if (login) {
      const url = 'ws://' + login.ip + ':' + login.port + '/logs';
      webSocket(url).subscribe({
        next: msg => this.logs.push(msg as LogData),
        error: err => console.log(err),
        complete: () => console.log('complete')
      });
    }
  }
}
