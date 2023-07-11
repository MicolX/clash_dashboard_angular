import { Injectable } from '@angular/core';
import { Version, ConfigData, LoginData, TITLE } from '../model/types'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observer, BehaviorSubject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
/*
provide login, url service
*/
export class BaseService {
  public configSubject: BehaviorSubject<ConfigData>;
  private _login: LoginData | undefined;
  private _version: Version | undefined;
  private _config: ConfigData | undefined;
  private _headers: HttpHeaders;
  private _params: HttpParams;

  constructor(private http: HttpClient) {
    this._headers = new HttpHeaders();
    this._params = new HttpParams();
    this.configSubject = new BehaviorSubject({} as ConfigData);
  }

  public get version(): Version | undefined {
    return this._version;
  }
  
  public get config(): ConfigData | undefined {
    return this._config;
  }
  
  public get login(): LoginData | undefined {
    return this._login;
  }

  public get params(): HttpParams {
    return this._params;
  }

  public get headers(): HttpHeaders {
    return this._headers;
  }
  
  public set login(value: LoginData | undefined) {
    this._login = value;
  }

  public getHttpUrl(endPoint: string) {
    return `http://${this._login?.address}:${this._login?.port}/${endPoint}`;
  }

  public getWsUrl(endPoint: string) {
    return `ws://${this._login?.address}:${this._login?.port}/${endPoint}`;
  }

  public startLogin(observer: Observer<Version>) {
    if (this._login?.secret) {
      this._headers = this._headers.set('Authorization', 'Bearer ' + this._login.secret);
    }
    this.http.get<Version>(this.getHttpUrl('version'), {headers: this._headers}).subscribe(observer);
  }

  public handleLoginNext(version: Version) {
    this._version = version;
    if (this._login?.secret) {
      this._params = this._params.set('secret', encodeURIComponent(this._login?.secret));
    }
  }

  public loadLocalStorage() {
    let localString = localStorage.getItem(TITLE);
		if (localString) {
			try {
				let loginData = JSON.parse(localString);
				this._login = {...loginData};
			} catch {
				localStorage.removeItem(TITLE);
			}
		}
  }

  public getConfig() {
    if (this._login?.secret) {
      this._headers.set('Authorization', 'Bearer ' + this._login.secret);
    }
    this.http.get<any>(this.getHttpUrl('configs'), {
      headers: this._headers
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
