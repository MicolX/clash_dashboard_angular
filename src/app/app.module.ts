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
import { UrlService } from './service/url-service.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list'
import { LogInDialogComponent } from './component/log-in-dialog/log-in-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { LogMonitorComponent } from './component/log-monitor/log-monitor.component';
import { NavItemComponent } from './component/nav-item/nav-item.component';
import { ProxyComponent } from './component/proxy/proxy.component';
import { ConnectionsComponent } from './component/connections/connections.component';
import { ProviderComponent } from './component/provider/provider.component';
import { LoginData } from './model/login-data';
import { ConfigComponent } from './component/config/config.component';
import { ConfigService } from './service/config.service';

export const routes: Routes = [
  {path: 'proxies', component: ProxyComponent, data: { title: 'Proxies', icon: 'local_parking'}},
  {path: 'connections', component: ConnectionsComponent, data: { title: 'Connections', icon: 'cable'}},
  {path: 'providers', component: ProviderComponent, data: { title: 'Provider', icon: 'real_estate_agent'}},
  {path: 'logs', component: LogMonitorComponent, data: { title: 'Log', icon: 'assignment'}},
  {path: 'config', component: ConfigComponent, data: { title: 'Configuration', icon: 'settings'}}
]

@NgModule({
  declarations: [
    AppComponent,
    LogInDialogComponent,
    LogMonitorComponent,
    NavItemComponent,
    ProxyComponent,
    ConnectionsComponent,
    ProviderComponent,
    ConfigComponent
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
  providers: [UrlService, LoginData, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule {}
