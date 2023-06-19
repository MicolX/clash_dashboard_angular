import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { LoginData } from '../app.component';

@Component({
	selector: 'app-log-in-dialog',
	templateUrl: './log-in-dialog.component.html',
	styleUrls: ['./log-in-dialog.component.css']
})
export class LogInDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<LogInDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: LoginData
	) {}

	onClick():void {
		this.dialogRef.close(this.data);
	}
}
