import { Component } from '@angular/core';
import { LogMonitorService } from 'src/app/service/log-monitor.service';

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
  logs: LogData[] | undefined;

  constructor(private logService: LogMonitorService) {}

  ngOnInit(): void {
    this.logs = this.logService.logs;
  }
}
