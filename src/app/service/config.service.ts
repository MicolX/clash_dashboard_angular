import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ConfigData } from '../model/types';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { defer, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config: ConfigData | undefined;

  constructor(private base: BaseService, private http: HttpClient) { }

  public getConfig() {
    return defer(() => {
      if (this._config) {
        return of(this._config);
      } else {
        return this.http.get<any>(this.base.getHttpUrl('configs'), {
          headers: this.base.headers
        }).pipe(map(value => {
          this._config = {} as ConfigData;
          if (value['allow-lan']) {
            this._config.allowLan = value['allow-lan'];
          }
          if (value['socks-port'] !== undefined) {
            this._config.socksPort = value['socks-port'];
          }
          if (value['redir-port'] !== undefined) {
            this._config.redirPort = value['redir-port'];
          }
          if (value['tproxy-port'] !== undefined) {
            this._config.tproxyPort = value['tproxy-port'];
          }
          if (value['mixed-port'] !== undefined) {
            this._config.mixedPort = value['mixed-port'];
          }
          if (value['bind-address']) {
            this._config.bindAddress = value['bind-address'];
          }
          if (value['log-level']) {
            this._config.logLevel = value['log-level'];
          }
          this._config.port = value.port;
          this._config.mode = value.mode;
          this._config.ipv6 = value.ipv6;
          return this._config;
        }));
      }
    });
  }

  public set config(value: ConfigData) {
    this._config = value;
  }

}
