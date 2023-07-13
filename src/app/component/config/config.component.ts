import { Component } from '@angular/core';
import { ConfigData } from '../../model/types';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  config: ConfigData;
  modes = ['direct', 'rule', 'global'];
  logLevel = ['debug', 'info', 'error'];

  constructor(private configService: ConfigService) {
      this.config = {} as ConfigData;
      configService.configSubject.subscribe(value => this.config = value);
  }

  ngOnInit(): void {
    this.config = this.configService.config;
  }

  onSubmit(): void {
    console.log(this.config);
  }

  
}

