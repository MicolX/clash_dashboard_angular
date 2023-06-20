import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData } from '../app.component';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private httpBaseUrl: string;
  private header: HttpHeaders;
  private wsBaseUrl: string;

  constructor(private http: HttpClient, login: LoginData) {
    this.httpBaseUrl = 'http://' + login.ip + ':' + login.port + '/';
    this.wsBaseUrl = 'ws://' + login.ip + ':' + login.port + '/';
    this.header = new HttpHeaders();
    this.header.set('Authorization', 'Bearer ' + login.secret);
  }

  getLog() {
    return this.httpGet('logs');
  }

  getTraffic() {
    return this.httpGet('traffic');
  }

  getProxies() {
    return this.httpGet('proxies');
  }

  getVersion() {
    return this.httpGet('version');
  }

  getConfigs() {
    return this.httpGet('configs');
  }

  getRules() {
    return this.httpGet('rules');
  }

  getConnections() {
    return this.httpGet('connections');
  }

  getProviders() {
    return this.httpGet('providers/proxies');
  }


  private httpGet(endPoint: string) {
    return this.http.get(this.httpBaseUrl + endPoint, {headers: this.header});
  }

  wsConnect(endPoint: string) {
    return webSocket(this.wsBaseUrl + endPoint);
  }
}
