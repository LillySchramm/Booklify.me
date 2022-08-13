import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ApiModule } from './api/api.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
    declarations: [AppComponent, LoginPageComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ApiModule,
        BrowserAnimationsModule,
        ButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
