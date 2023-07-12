import { Component } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { BaseService } from 'src/app/service/base.service';

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
  private socket: WebSocketSubject<any>;

  constructor(private base: BaseService) {
    this.logs = new Array();
    let params = this.base.params;
    if (this.base.config && this.base.config.logLevel) {
      params = params.append('level', this.base.config.logLevel);
    }
    const url = params ? `${this.base.getWsUrl('logs')}?${params?.toString()}` : this.base.getWsUrl('logs');
    this.socket = webSocket(url);
  }

  ngOnInit(): void {
    this.socket.subscribe({
      next: msg => this.logs.push(msg as LogData),
      error: err => console.log(err),
      complete: () => {console.log('log websocket disconnected')}
    });
  }
}
