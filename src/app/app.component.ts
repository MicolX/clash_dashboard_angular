import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialogComponent } from './log-in-dialog/log-in-dialog.component';
import { routes } from './app.module';

export class LoginData {
	ip: string;
	port: string;
	secret: string;

	constructor() {
		this.ip = '';
		this.port = '';
		this.secret = '';
	}
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	routes = routes;
	title = 'clash-dashboard-angular';
	login: LoginData|null;

	constructor(public dialog: MatDialog) {
		let localString = localStorage.getItem(this.title);
		if (localString) {
			this.login = JSON.parse(localString);
		} else {
			this.login = new LoginData();
		}
	 }

	ngOnInit(): void {
		if (!this.login?.ip) {
			const dialogRef = this.dialog.open(LogInDialogComponent, {data: this.login, disableClose: true, width: '20%'});
			dialogRef.afterClosed().subscribe(result => {
				this.login = result;
				localStorage.setItem(this.title, JSON.stringify(this.login));
			})
		}
	}
}