import { Component, EventEmitter, Output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/api';
import { SystemState } from 'src/app/state/system/system.state';
import { UiState } from 'src/app/state/ui/ui.state';
import { UserState } from 'src/app/state/user/user.state';
import { UserDisplayComponent } from './user-display/user-display.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        TranslocoModule,
        RouterModule,
        UserDisplayComponent,
        MatIconModule,
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Select(UserState.currentUser) user$!: Observable<UserDto | undefined>;
    $user = toSignal(this.user$);

    @Select(UiState.isSidenavVisible) isSidenavVisible$!: Observable<boolean>;
    $isSidenavVisible = toSignal(this.isSidenavVisible$);

    @Select(SystemState.legalEnabled) legalEnabled$!: Observable<
        boolean | undefined
    >;
    $legalEnabled = toSignal(this.legalEnabled$);

    @Select(SystemState.privacyUrl) privacyUrl$!: Observable<string>;
    $privacyUrl = toSignal(this.privacyUrl$);

    @Select(SystemState.tosUrl) tosUrl$!: Observable<string>;
    $tosUrl = toSignal(this.tosUrl$);

    @Select(SystemState.version) version$!: Observable<string>;
    $version = toSignal(this.version$);

    @Output() toggleSidenav = new EventEmitter<void>();
}
