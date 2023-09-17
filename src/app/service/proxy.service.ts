import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private base: BaseService, private http: HttpClient) {  }

  getProviderProxies() {
    return this.http.get<any>(this.base.getHttpUrl('providers/proxies'), {headers: this.base.headers}).pipe(map(v => v['providers']));
  }
}
