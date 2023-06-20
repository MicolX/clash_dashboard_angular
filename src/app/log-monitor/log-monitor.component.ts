import { Component, Input } from '@angular/core';
import { HttpService } from '../service/http-service.service';
import { LoginData } from '../app.component';
import { webSocket, WebSocketSubjectConfig } from 'rxjs/webSocket';

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
  @Input() private login: LoginData|undefined;

  constructor(private service: HttpService) {
    this.logs = new Array();
    if (this.login) {
      const url = 'ws://' + this.login.ip + ':' + this.login.port + '/logs';
      webSocket({
        url: url,
        deserializer: 
      }).subscribe({
        next: msg => this.logs.push(msg)
      })
    }
  }
}
