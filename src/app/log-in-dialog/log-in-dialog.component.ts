import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { LoginData } from '../app.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-log-in-dialog',
	templateUrl: './log-in-dialog.component.html',
	styleUrls: ['./log-in-dialog.component.css'],
	standalone: true,
	imports: [
		MatCardModule,
		MatFormFieldModule,
		MatDialogModule,
		FormsModule,
		MatInputModule,
		MatButtonModule
	]
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
