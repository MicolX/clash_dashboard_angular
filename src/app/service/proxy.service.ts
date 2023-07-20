import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Proxy } from '../model/types';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  constructor(private base: BaseService, private http: HttpClient) {  }

  getProxies() {
    return this.http.get<[Proxy]>(this.base.getHttpUrl('/proxy'));
  }
}
