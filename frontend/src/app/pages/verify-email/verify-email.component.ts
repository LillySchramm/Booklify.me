import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserActions } from 'src/app/state/user/user.actions';

@Component({
    selector: 'app-verify-email',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
    constructor(
        private store: Store,
        private router: Router,
    ) {
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
