import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { Configuration } from './api';
import { ApiModule } from './api/api.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageHeaderModule } from './components/page-header/page-header.module';
import { ExternalDevicesPageModule } from './pages/external-devices-page/external-devices-page.module';
import { GithubSuccessPageModule } from './pages/github-success-page/github-success-page.module';
import { HomePageModule } from './pages/home-page/home-page.module';
import { LoginPageModule } from './pages/login-page/login-page.module';
import { QrDialogComponent } from './components/qr-dialog/qr-dialog.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ApiModule,
        GithubSuccessPageModule,
        ExternalDevicesPageModule,
        LoginPageModule,
        HomePageModule,
        PageHeaderModule,
    ],
    providers: [
        {
            provide: Configuration,
            useFactory: () =>
                new Configuration({
                    basePath: environment.API_BASE_PATH,
                    credentials: {
                        bearer: () =>
                            `Bearer ${localStorage.getItem('auth') || ''}`,
                    },
                }),
            multi: false,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
