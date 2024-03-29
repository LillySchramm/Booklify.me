import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UiState } from 'src/app/state/ui/ui.state';
import { ReportButtonComponent } from '../components/report-button/report-button.component';
import { AccountComponent } from './account/account.component';
import { CollectionComponent } from './collection/collection.component';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [
        CollectionComponent,
        MatDividerModule,
        TranslocoModule,
        AccountComponent,
        ReportButtonComponent,
    ],
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
    @Select(UiState.pageTitle) pageTitle$!: Observable<string | undefined>;
    $pageTitle = toSignal(this.pageTitle$);

    @Select(UiState.pageSubtitle) pageSubtitle$!: Observable<
        string | undefined
    >;
    $pageSubtitle = toSignal(this.pageSubtitle$);

    @Select(UiState.sideNavMode) sideNavMode$!: Observable<string | undefined>;
    $sideNavMode = toSignal(this.sideNavMode$);

    constructor() {}
}
