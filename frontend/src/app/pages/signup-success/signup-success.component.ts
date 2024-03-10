import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslocoModule } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UserActions } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';

@Component({
    selector: 'app-signup-success',
    standalone: true,
    imports: [
        TranslocoModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
    ],
    templateUrl: './signup-success.component.html',
    styleUrls: ['./signup-success.component.scss'],
})
export class SignupSuccessComponent {
    @Select(UserState.signupEmail) email$!: Observable<string | undefined>;
    $email = toSignal(this.email$);

    @Select(UserState.resending) resending$!: Observable<boolean>;
    $resending = toSignal(this.resending$);

    constructor(private store: Store) {
        this.store.dispatch(new UiActions.ChangeSidenavVisibility(false));
        this.store.dispatch(new UiActions.ChangePageTitle(undefined));
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new UiActions.ChangePageSubtitle(undefined));
    }

    resend(): void {
        if (this.$resending()) {
            return;
        }

        this.store.dispatch(new UserActions.ResendConfirmation());
    }
}
