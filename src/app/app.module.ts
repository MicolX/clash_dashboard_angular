import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './service/http-service.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'
import { LogInDialogComponent } from './log-in-dialog/log-in-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import { LogMonitorComponent } from './log-monitor/log-monitor.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { ProxyComponent } from './proxy/proxy.component';
import { ConnectionsComponent } from './connections/connections.component';
import { ProviderComponent } from './provider/provider.component';

export const routes: Routes = [
  {path: 'logs', component: LogMonitorComponent, data: { title: 'Log', icon: 'assignment'}},
  {path: 'proxies', component: ProxyComponent, data: { title: 'Proxies', icon: 'local_parking'}},
  {path: 'connections', component: ConnectionsComponent, data: { title: 'Connections', icon: 'cable'}},
  {path: 'providers', component: ProviderComponent, data: { title: 'Provider', icon: 'real_estate_agent'}}
]

@NgModule({
  declarations: [
    AppComponent,
    LogInDialogComponent,
    LogMonitorComponent,
    NavItemComponent,
    ProxyComponent,
    ConnectionsComponent,
    ProviderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
		MatFormFieldModule,
		MatDialogModule,
		FormsModule,
		MatInputModule,
		MatButtonModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
