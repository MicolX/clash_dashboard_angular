import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { LoginData } from '../../model/types';
import { BaseService } from 'src/app/service/base.service';

@Component({
	selector: 'app-log-in-dialog',
	templateUrl: './log-in-dialog.component.html',
	styleUrls: ['./log-in-dialog.component.css']
})
export class LogInDialogComponent {
	data: LoginData
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
		this.base.startLogin()
		this.dialogRef.close(this.data);
	}
}
