import { Component } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
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

  constructor(private base: BaseService) {
    this.logs = new Array();
    let params = base.params;
    if (base.config && base.config['log-level']) {
      params = params.append('level', base.config['log-level']);
    }
    const url = params ? `${base.getWsUrl('logs')}?${params?.toString()}` : base.getWsUrl('logs');
    webSocket(url).subscribe({
      next: msg => this.logs.push(msg as LogData),
      error: err => console.log(err),
      complete: () => {}
    });
  }
}
