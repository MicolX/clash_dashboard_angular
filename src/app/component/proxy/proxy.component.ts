import { Component } from '@angular/core';
import { Proxy } from 'src/app/model/types';
import { ProxyService } from 'src/app/service/proxy.service';

@Component({
  selector: 'app-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.css']
})
export class ProxyComponent {
  proxies: [Proxy] | undefined;
  constructor(private proxyService: ProxyService) {
    proxyService.getProxies().subscribe(value => this.proxies = value);
  }
}
