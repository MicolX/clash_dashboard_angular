import { Component } from '@angular/core';
import { HttpService } from '../service/http-service.service';
import { ConfigData } from '../model/config-data';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  http: HttpService;
  config: ConfigData;

  constructor(private http: HttpService, private config: ConfigData) {
    this.http = http;
    this.config = config;
  }
}

