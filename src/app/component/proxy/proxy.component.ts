import { Component, OnInit } from '@angular/core';
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
    providerFilter: Set<string>;
    providerSelected: string;
    protocolFilter: Set<string>;
    protocolSelected: string;

    constructor(private proxyService: ProxyService) {
        this.proxies = [];
        this.proxiesFiltered = [];
        this.providerFilter = new Set<string>();
        this.providerSelected = 'None';
        this.protocolFilter = new Set<string>();
        this.protocolSelected = 'None';
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
                    this.providerFilter.add(name);
                    data[name].proxies.forEach((element: Proxy) => {
                        element.provider = name;
                        element.chosen = element.name == chosen;
                        this.proxies.push(element);
                        this.proxiesFiltered.push(element);
                        if (element.type) {
                            this.protocolFilter.add(element.type);
                        }
                    });
                }
            }
        });
    }

    providerFilterChanged(): void {
        this.proxiesFiltered = this.proxiesFiltered.filter(value => {
            value.provider == this.providerSelected;
        })
    }

    protocolFilterChanged(): void {
        this.proxiesFiltered = this.proxiesFiltered.filter(value => {
            value.type == this.protocolSelected;
        })
    }

    clearFilter() {
        this.protocolSelected = 'None';
        this.providerSelected = 'None';
        this.proxiesFiltered = [...this.proxies];
    }
}
