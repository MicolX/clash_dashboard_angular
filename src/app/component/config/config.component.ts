import { Component } from '@angular/core';
import { ConfigData } from '../../model/types';
import { BaseService } from 'src/app/service/base.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  config: ConfigData | undefined;

  constructor(
    private base: BaseService,
    private http: HttpClient
    ) {
  }

  ngOnInit(): void {
    this.config = this.base.config;
  }
}

