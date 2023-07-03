import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialogComponent } from './component/log-in-dialog/log-in-dialog.component';
import { routes } from './app.module';
import { UrlService } from './service/url-service.service';
import { BaseService } from './service/base.service';
import { Observer } from 'rxjs';
import { Version } from './model/types';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	routes = routes;
	version: Version | undefined;
	private baseService: BaseService;

	constructor(public dialog: MatDialog, http: UrlService, base: BaseService) {
		this.baseService = base;
	}

	ngOnInit(): void {
		this.baseService.loadLocalStorage();
		if (!this.baseService.login) {
			this.popupLogin().afterClosed().subscribe((value: Version) => {this.version = value; });
		} else {
			const observer: Observer<Version> = {
				next: this.baseService.handleLoginNext,
				error: (e) => {
					this.popupLogin().afterClosed().subscribe((value: Version) => {this.version = value});
				},
				complete: () => {
					this.version = this.baseService.version;
					console.log(this.baseService.version);
				}
			}
			this.baseService.startLogin(observer);
		}
	}

	private popupLogin() {
		return this.dialog.open(LogInDialogComponent, {disableClose: true, width: '20%'});
	}
}