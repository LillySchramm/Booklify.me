import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule, Configuration } from './api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { TranslocoRootModule } from './transloco-root.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ApiModule,
        HttpClientModule,
        HeaderComponent,
        TranslocoRootModule,
    ],
    providers: [
        {
            provide: Configuration,
            useFactory: () =>
                new Configuration({
                    basePath: 'http://localhost:3000',
                    credentials: {
                        bearer: () => `Bearer ${localStorage.getItem('token')}`,
                    },
                }),
            multi: false,
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],

    bootstrap: [AppComponent],
})
export class AppModule {}
