import { Injectable } from '@angular/core';
import { Version, ConfigData } from '../model/types'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private address: string;
  private port: number;
  private secret: string;
  private version: Version;
  private config: ConfigData;

  constructor(http: HttpClient) { }
}
