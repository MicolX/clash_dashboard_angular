import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { LoginData, Version } from '../../model/types';
import { BaseService } from 'src/app/service/base.service';
import { Observer } from 'rxjs';
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
		public dialogRef: MatDialogRef<LogInDialogComponent>,
		private base: BaseService
	) {
		this.data = {
			address: '127.0.0.1',
			port: 7890
		}
	}

	onClick():void {
		this.base.login = {
			address: this.data.address,
			port: this.data.port,
			secret: this.data.secret
		}
		this.base.startLogin({
			next: this.base.handleLoginNext,
			error: (e: HttpErrorResponse) => {
				this.error = e.error;
			},
			complete: () => {
				this.dialogRef.close();
			}
		});
	}
}
