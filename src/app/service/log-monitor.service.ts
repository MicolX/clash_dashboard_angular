import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ConfigData, LogData } from '../model/types';
import { ConfigService } from './config.service';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class LogMonitorService {
  logs: LogData[];

  constructor(
    private configService: ConfigService,
    private baseService: BaseService
    ) {
      this.logs = new Array();
      configService.getConfig().subscribe((value) => this.startWebSocket(value));
  }

  startWebSocket(value: ConfigData) {
    let params = this.baseService.params;
    if (value.logLevel) {
      params = params.append('level', value.logLevel);
    }
    const url = params ? `${this.baseService.getWsUrl('logs')}?${params?.toString()}` : this.baseService.getWsUrl('logs');
    webSocket(url).subscribe({
      next: msg => {this.logs.push(msg as LogData); },
      error: err => console.log(err),
      complete: () => {console.log('log websocket disconnected')}
    });
  }
}
