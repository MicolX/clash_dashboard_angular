import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData } from '../model/login-data';


@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private httpBaseUrl: string;
  private wsBaseUrl: string;
  private header: HttpHeaders;
  private loginData: LoginData;

  constructor(private http: HttpClient, private login: LoginData) {
    this.httpBaseUrl = 'http://' + login.ip + ':' + login.port + '/';
    this.wsBaseUrl = 'ws://' + login.ip + ':' + login.port + '/';
    this.header = new HttpHeaders();
    this.header.set('Authorization', 'Bearer ' + login.secret);
    this.loginData = login;
  }

  getHeaders() {
    return this.header;
  }

  getHttpUrl(endPoint: string) {
    return this.httpBaseUrl + endPoint;
  }

  getWsUrl(endPoint: string, params: URLSearchParams) {
    if (this.loginData.secret) {
      params.set('Authorization', encodeURIComponent(this.loginData.secret));
    }
    
    return `${this.wsBaseUrl}${endPoint}${params.toString()}`;
  }
}
