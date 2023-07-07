import { Component } from '@angular/core';
import { ConfigData } from '../../model/types';
import { BaseService } from 'src/app/service/base.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  config: ConfigData;
  configForm: FormGroup;
  
  modes = ['direct', 'rule', 'global'];
  logLevel = ['debug', 'info', 'error'];

  constructor(
    private base: BaseService,
    private http: HttpClient,
    private _formBuilder: FormBuilder
    ) {
      this.config = {} as ConfigData;
      this.configForm = {} as FormGroup;
  }

  ngOnInit(): void {
    this.config = this.base.config || {} as ConfigData;
    this.configForm = this._formBuilder.group(this.config);
    console.log(this.config);
  }

  onSubmit(): void {

  }
}

