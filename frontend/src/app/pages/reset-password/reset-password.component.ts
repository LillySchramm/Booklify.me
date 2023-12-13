import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { ResetPasswordCardComponent } from './reset-password-card/reset-password-card.component';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [ResetPasswordCardComponent],
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
    constructor(private store: Store) {
        this.store.dispatch(new UiActions.ChangeSidenavVisibility(false));
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new UiActions.ChangePageTitle(undefined));
        this.store.dispatch(new UiActions.ChangePageSubtitle(undefined));
    }
}
