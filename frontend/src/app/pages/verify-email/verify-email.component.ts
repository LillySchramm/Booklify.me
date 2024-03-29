import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UserActions } from 'src/app/state/user/user.actions';

@Component({
    selector: 'app-verify-email',
    standalone: true,
    imports: [],
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
    constructor(
        private store: Store,
        private router: Router,
    ) {
        this.store.dispatch(new UiActions.ChangeSidenavVisibility(false));
        this.store.dispatch(new UiActions.ChangePageTitle(undefined));
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new UiActions.ChangePageSubtitle(undefined));

        const urlParams = new URLSearchParams(window.location.search);
        const key = urlParams.get('key');
        const id = urlParams.get('id');
        const userId = urlParams.get('user_id');

        if (!key || !id || !userId) {
            this.router.navigate(['login']);
            return;
        }
        this.store.dispatch(new UserActions.VerifyEmail(userId, key, id));
    }
}
