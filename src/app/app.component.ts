import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialogComponent } from './component/log-in-dialog/log-in-dialog.component';
import { routes } from './app.module';
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

	constructor(
		private dialog: MatDialog, 
		private baseService: BaseService
		) {
	}

	ngOnInit(): void {
		this.baseService.loadLocalStorage();
		if (!this.baseService.login) {
			this.popupLogin().afterClosed().subscribe((value: Version) => {
				this.version = this.baseService.version; 
				this.baseService.getConfig();
			});
		} else {
			const observer: Observer<Version> = {
				next: (value: Version) => {
					this.baseService.handleLoginNext(value);
				},
				error: (e) => {
					this.popupLogin().afterClosed().subscribe((value: Version) => {
						this.version = this.baseService.version; 
					});
				},
				complete: () => {
					this.version = this.baseService.version;
					this.baseService.getConfig();
				}
			}
			this.baseService.startLogin(observer);
		}
	}

	private popupLogin() {
		return this.dialog.open(LogInDialogComponent, {disableClose: true, width: '20%'});
	}
}