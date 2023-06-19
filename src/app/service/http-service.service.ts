import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginData } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string
  header: HttpHeaders

  constructor(private http: HttpClient, login: LoginData) {
    this.baseUrl = 'http://' + login.ip + ':' + login.port + '/';
    this.header = new HttpHeaders();
    this.header.set('Authorization', 'Bearer ' + login.secret);
  }

  getLog() {
    this.get('logs').subscribe()
  }

  getTraffic() {
    this.get('traffic').subscribe()
  }

  get(endPoint: string) {
    return this.http.get(this.baseUrl + endPoint, {headers: this.header})
  }
}
