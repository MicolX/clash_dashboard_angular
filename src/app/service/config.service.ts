import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url-service.service';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: ConfigData | undefined;

  constructor(private http: HttpClient, private url: UrlService) {
    this.http.get<ConfigData>(this.url.getHttpUrl('config'), {headers: this.url.getHeaders()})
    .subscribe((data: ConfigData) => this.config = {...data});
  }

  getConfig() {
    return this.config;
  }

  getLogLevel() : string {
    if (!this.config?.logLevel) return 'info'
    return this.config?.logLevel;
  }
}
