import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialogComponent } from './component/log-in-dialog/log-in-dialog.component';
import { routes } from './app.module';
import { LoginData } from './model/login-data';
import { UrlService } from './service/url-service.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	routes = routes;
	title = 'clash-dashboard-angular';
	loginData: LoginData;

	constructor(public dialog: MatDialog, login: LoginData, http: UrlService) {
		this.loginData = login;
		
		let localString = localStorage.getItem(this.title);
		if (localString) {
			let loginData = JSON.parse(localString);
			this.loginData.ip = loginData?.ip;
			this.loginData.port = loginData?.port;
			this.loginData.secret = loginData?.secret;
		}
	 }

	ngOnInit(): void {
		if (!this.loginData.ip || !this.loginData.port) {
			const dialogRef = this.dialog.open(LogInDialogComponent, {data: this.loginData, disableClose: true, width: '20%'});
			dialogRef.afterClosed().subscribe(result => {
				this.loginData = result;
				localStorage.setItem(this.title, JSON.stringify(this.loginData));
				this.http.getConfigs().subscribe(result => {
					this.configData = result;
				})
			});
		}

	}
}