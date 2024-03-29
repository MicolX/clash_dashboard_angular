import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'
import { LoginData, TITLE, Version } from '../../model/types';
import { BaseService } from 'src/app/service/base.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-log-in-dialog',
	templateUrl: './log-in-dialog.component.html',
	styleUrls: ['./log-in-dialog.component.css']
})
export class LogInDialogComponent {
	data: LoginData
	error: string | undefined;

	constructor(
		private dialogRef: MatDialogRef<LogInDialogComponent>,
		private base: BaseService
	) {
		this.data = {
			address: '127.0.0.1',
			port: 9090
		}
	}

	onClick():void {
		this.base.login = {...this.data};
		this.base.startLogin().subscribe({
			next: (value: Version) => {
				this.base.handleLoginNext(value);
			},
			error: (e: HttpErrorResponse) => {
				this.error = e.message;
			},
			complete: () => {
				localStorage.setItem(TITLE, JSON.stringify(this.data));
				this.dialogRef.close();
			}
		});
	}
}
