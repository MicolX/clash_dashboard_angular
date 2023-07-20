import { Injectable } from '@angular/core';
import { Version, LoginData, TITLE } from '../model/types'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
/*
provide login, url service
*/
export class BaseService {
  private _login: LoginData | undefined;
  private _version: Version | undefined;
  private _headers: HttpHeaders;
  private _params: HttpParams;

  constructor(private http: HttpClient) {
    this._headers = new HttpHeaders();
    this._params = new HttpParams();
  }

  public get version(): Version | undefined {
    return this._version;
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

  public startLogin() {
    this._headers = this._login?.secret ? this._headers.set('Authorization', 'Bearer ' + this._login.secret) : new HttpHeaders();
    return this.http.get<Version>(this.getHttpUrl('version'), {headers: this._headers});
  }

  public handleLoginNext(version: Version) {
    this._version = version;
    if (this._login?.secret) {
      this._params = this._params.set('token', encodeURIComponent(this._login?.secret));
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
}
