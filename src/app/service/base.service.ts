import { Injectable } from '@angular/core';
import { Version, ConfigData, LoginData } from '../model/types'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { LogInDialogComponent } from '../component/log-in-dialog/log-in-dialog.component';
import { Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
/*
provide login, url service
*/
export class BaseService {
  private _login: LoginData | undefined;
  private _version: Version | undefined;
  private _config: ConfigData | undefined;
  private http: HttpClient;
  private headers: HttpHeaders;
  private params: HttpParams;
  private title = 'clash-dashboard-angular';

  constructor(http: HttpClient) {
    this.http = http; 
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
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
      this.headers.set('Authorization', 'Bearer ' + this._login.secret);
    }
    this.http.get<Version>(this.getHttpUrl('version'), {headers: this.headers}).subscribe(observer);
  }

  public handleLoginNext(version: Version) {
    this._version = version;
    if (this._login?.secret) {
      this.params.set('secret', this._login?.secret);
    }
    localStorage.setItem(this.title, JSON.stringify(this._login));
  }

  public loadLocalStorage() {
    let localString = localStorage.getItem(this.title);
		if (localString) {
			try {
				let loginData = JSON.parse(localString);
				this._login = {...loginData};
			} catch {
				localStorage.removeItem(this.title);
			}
		}
  }

  public getConfig() {
    if (this._login?.secret) {
      this.headers.set('Authorization', 'Bearer ' + this._login.secret);
    }
    this.http.get<ConfigData>(this.getHttpUrl('config'), {
      headers: this.headers
    }).subscribe((value: ConfigData) => this._config = value);
  }
}
