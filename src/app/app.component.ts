import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialogComponent } from './component/log-in-dialog/log-in-dialog.component';
import { routes } from './app.module';
import { BaseService } from './service/base.service';
import { Observer } from 'rxjs';
import { Version } from './model/types';
import { __values } from 'tslib';
import { ConfigService } from './service/config.service';


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
		private baseService: BaseService,
		private configService: ConfigService
		) {
	}

	ngOnInit(): void {
		this.baseService.loadLocalStorage();
		if (!this.baseService.login) {
			this.popupLogin().afterClosed().subscribe(() => {
				this.version = this.baseService.version;
				this.configService.getConfig()
			});
		} else {
			this.baseService.startLogin().subscribe({
				next: (value) => {
					this.baseService.handleLoginNext(value);
					this.version = value;
				},
				error: () => {
					this.popupLogin().afterClosed().subscribe(() => {
						this.version = this.baseService.version;
						this.configService.getConfig()
					});
				},
				complete: () => {
					this.configService.getConfig();
				}
			});
		}
	}

	private popupLogin() {
		return this.dialog.open(LogInDialogComponent, {disableClose: true, width: '20%'});
	}
}