import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialogComponent } from './component/log-in-dialog/log-in-dialog.component';
import { routes } from './app.module';
import { UrlService } from './service/url-service.service';
import { BaseService } from './service/base.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	routes = routes;
	title = 'clash-dashboard-angular';
	private baseService: BaseService;

	constructor(public dialog: MatDialog, http: UrlService, base: BaseService) {
		this.baseService = base;
		let localString = localStorage.getItem(this.title);
		if (localString) {
			try {
				let loginData = JSON.parse(localString);
				this.baseService.login = {...loginData};
			} catch {
				localStorage.removeItem(this.title);
			}
		}
	}

	ngOnInit(): void {
		if (!this.baseService.login) {
			const dialogRef = this.dialog.open(LogInDialogComponent, {disableClose: true, width: '20%'});
			dialogRef.afterClosed().subscribe(result => {
				this.baseService.login = {...result}
				this.baseService.getVersion();
			});
		}

	}
}