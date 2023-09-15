import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { ApiModule, Configuration } from './api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailsSideComponent } from './common/components/book-details-side/book-details-side.component';
import { HeaderComponent } from './common/header/header.component';
import { getToken } from './common/services/token.service';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { AuthorState } from './state/authors/author.state';
import { BooksState } from './state/books/books.state';
import { PublisherState } from './state/publisher/publisher.state';
import { SystemState } from './state/system/system.state';
import { UiState } from './state/ui/ui.state';
import { UserState } from './state/user/user.state';
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
        NgxsModule.forRoot([
            UserState,
            UiState,
            BooksState,
            PublisherState,
            AuthorState,
            SystemState,
        ]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
        MatSnackBarModule,
        MatSidenavModule,
        SidenavComponent,
        BookDetailsSideComponent,
    ],
    providers: [
        {
            provide: Configuration,
            useFactory: () =>
                new Configuration({
                    basePath: environment.apiUrl,
                    credentials: {
                        bearer: () => `Bearer ${getToken()}`,
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
