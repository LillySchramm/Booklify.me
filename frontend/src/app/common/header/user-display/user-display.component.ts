import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/api';
import { UserActions } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';

@Component({
    selector: 'app-user-display',
    standalone: true,
    imports: [
        MatButtonModule,
        TranslocoModule,
        MatIconModule,
        MatMenuModule,
        RouterModule,
    ],
    templateUrl: './user-display.component.html',
    styleUrls: ['./user-display.component.scss'],
})
export class UserDisplayComponent {
    @Select(UserState.currentUser) user$!: Observable<UserDto | undefined>;
    $user = toSignal(this.user$);

    constructor(private store: Store) {}

    logout(): void {
        this.store.dispatch(new UserActions.LogOut());
    }
}
