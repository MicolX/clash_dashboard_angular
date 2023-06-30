import { Component } from '@angular/core';
import { UrlService } from '../../service/url-service.service';
import { ConfigData } from '../../service/config.service';
import { ConfigService } from 'src/app/service/config.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  configData: ConfigData | undefined;

  constructor(private http: UrlService, private config: ConfigService) {
    this.configData = config.getConfig();
  }
}

