import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ConfigData } from '../model/types';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config: ConfigData;
  public configSubject: BehaviorSubject<ConfigData>;

  constructor(
    private base: BaseService,
    private http: HttpClient
    ) { 
      console.log('config born');
      this._config = {} as ConfigData;
      this.configSubject = new BehaviorSubject({} as ConfigData);
      this.configSubject.subscribe(value => this._config = value);
    }

  public get config(): ConfigData {
    return this._config;
  }
  public set config(value: ConfigData) {
    this._config = value;
  }

  public getConfig() {
    this.http.get<any>(this.base.getHttpUrl('configs'), {
      headers: this.base.headers
    }).pipe(map(value => {
      const newValue = {} as ConfigData;
      if (value['allow-lan']) {
        newValue.allowLan = value['allow-lan'];
      }
      if (value['socks-port'] !== undefined) {
        newValue.socksPort = value['socks-port'];
      }
      if (value['redir-port'] !== undefined) {
        newValue.redirPort = value['redir-port'];
      }
      if (value['tproxy-port'] !== undefined) {
        newValue.tproxyPort = value['tproxy-port'];
      }
      if (value['mixed-port'] !== undefined) {
        newValue.mixedPort = value['mixed-port'];
      }
      if (value['bind-address']) {
        newValue.bindAddress = value['bind-address'];
      }
      if (value['log-level']) {
        newValue.logLevel = value['log-level'];
      }
      newValue.port = value.port;
      newValue.mode = value.mode;
      newValue.ipv6 = value.ipv6;
      return newValue;
    })).subscribe(this.configSubject);
  }
}
