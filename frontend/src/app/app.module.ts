import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { BASE_PATH } from './api';
import { ApiModule } from './api/api.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubSuccessPageModule } from './pages/github-success-page/github-success-page.module';
import { LoginPageModule } from './pages/login-page/login-page.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ApiModule,
        GithubSuccessPageModule,
        LoginPageModule,
    ],
    providers: [{ provide: BASE_PATH, useValue: environment.API_BASE_PATH }],
    bootstrap: [AppComponent],
})
export class AppModule {}
