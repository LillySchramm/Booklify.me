import { isDevMode, NgModule } from '@angular/core';
import { provideTransloco, TranslocoModule } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

@NgModule({
    exports: [TranslocoModule],
    providers: [
        provideTransloco({
            config: {
                availableLangs: ['en'],
                defaultLang: 'en',
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            },
            loader: TranslocoHttpLoader,
        }),
    ],
})
export class TranslocoRootModule {}
