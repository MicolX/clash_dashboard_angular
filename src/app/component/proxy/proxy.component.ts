import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Proxy } from 'src/app/model/types';
import { ProxyService } from 'src/app/service/proxy.service';

@Component({
    selector: 'app-proxy',
    templateUrl: './proxy.component.html',
    styleUrls: ['./proxy.component.css']
})
export class ProxyComponent implements OnInit{

    proxies: Array<Proxy>;
    proxiesFiltered: Array<Proxy>;
    providerFilter: Map<string, boolean>;
    protocolFilter: Map<string, boolean>;

    constructor(private proxyService: ProxyService) {
        this.proxies = [];
        this.proxiesFiltered = [];
        this.providerFilter = new Map<string, boolean>();
        this.protocolFilter = new Map<string, boolean>();
    }

    ngOnInit(): void {
        let chosen = '';
        this.proxyService.getProviderProxies().subscribe(data => {
            data['default'].proxies.forEach((element : Proxy) => {
                if (element.now) {
                    chosen = element.now;
                }
            });
            for (let name of Object.keys(data)) {
                if (name != 'default') {
                    this.providerFilter.set(name, true);
                    data[name].proxies.forEach((element: Proxy) => {
                        element.provider = name;
                        element.chosen = element.name == chosen;
                        this.proxies.push(element);
                        this.proxiesFiltered.push(element);
                        if (element.type) {
                            this.protocolFilter.set(element.type, true);
                        }
                    });
                }
            }
        });
    }

    filterChange(filter: Map<string, boolean>, key: string, event: MatCheckboxChange) {
        let checked = event.checked;
        filter.set(key, checked);
        this.applyFilter();
    }

    filterSelectAll(type: string) {
        
    }

    private applyFilter() {
        this.proxiesFiltered = this.proxies.filter(value => {
            return value.provider && this.providerFilter.get(value.provider) && this.protocolFilter.get(value.type);
        })
    }
}
