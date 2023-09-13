import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UiState } from 'src/app/state/ui/ui.state';
import { CollectionComponent } from './collection/collection.component';

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [
        CommonModule,
        CollectionComponent,
        MatDividerModule,
        TranslocoModule,
    ],
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
    @Select(UiState.pageTitle) pageTitle$!: Observable<string | undefined>;
    $pageTitle = toSignal(this.pageTitle$);

    constructor() {}
}