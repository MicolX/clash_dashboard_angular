import { Component, Input } from '@angular/core';
import { UrlService } from '../../service/url-service.service';
import { webSocket, WebSocketSubjectConfig } from 'rxjs/webSocket';
import { LoginData } from '../../model/login-data';
import { ConfigService } from 'src/app/service/config.service';

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

  constructor(private url: UrlService, login: LoginData, config: ConfigService) {
    this.logs = new Array();
    if (login) {
      let params = new URLSearchParams();
      params.set('level', config.getLogLevel());
      webSocket(url.getWsUrl('logs', params)).subscribe({
        next: msg => this.logs.push(msg as LogData),
        error: err => console.log(err),
        complete: () => console.log('complete')
      });
    }
  }
}
