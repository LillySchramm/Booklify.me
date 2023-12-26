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

    @Output() toggleSidenav = new EventEmitter<void>();
}
