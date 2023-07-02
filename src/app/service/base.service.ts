import { Injectable } from '@angular/core';
import { Version, ConfigData, LoginData } from '../model/types'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs';



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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // client-side/network error

    }
  }

  public startLogin() {
    if (this._login?.secret) {
      this.headers.set('Authorization', 'Bearer ' + this._login.secret);
    }
    this.http.get<Version>(this.getHttpUrl('version'), {
      headers: this.headers
    }).pipe(catchError(this.handleError)).subscribe((value: Version) => {
      this._version = value
      if (this._login?.secret) {
        this.params.set('secret', this._login?.secret);
      }
    });
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
