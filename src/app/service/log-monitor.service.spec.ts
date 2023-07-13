import { TestBed } from '@angular/core/testing';

import { LogMonitorService } from './log-monitor.service';

describe('LogMonitorService', () => {
  let service: LogMonitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogMonitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
