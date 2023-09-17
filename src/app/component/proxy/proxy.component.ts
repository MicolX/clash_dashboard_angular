import { Component } from '@angular/core';
import { Proxy } from 'src/app/model/types';
import { ProxyService } from 'src/app/service/proxy.service';

@Component({
    selector: 'app-proxy',
    templateUrl: './proxy.component.html',
    styleUrls: ['./proxy.component.css']
})
export class ProxyComponent {
    proxies: { [name: string] : [Proxy & {chosen: boolean}]};
    constructor(private proxyService: ProxyService) {
        this.proxies = {};
        let chosen = '';
        proxyService.getProviderProxies().subscribe(value => {
            value['default'].proxies.forEach((element : Proxy) => {
                if (element.now) {
                    chosen = element.now;
                }
            });
            for (let name of Object.keys(value)) {
                if (name != 'default') {
                    this.proxies[name] = value[name].proxies;
                }
            }
            for (let value of Object.values(this.proxies)) {
                for (let proxy of value) {
                    proxy.chosen = proxy.name == chosen;
                }
            }
        });
    }
}
