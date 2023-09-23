import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/common/services/token.service';
import { SystemActions } from 'src/app/state/system/system.actions';
import { SystemState } from 'src/app/state/system/system.state';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { LoginCardComponent } from './login-card/login-card.component';
import { SignupCardComponent } from './signup-card/signup-card.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        LoginCardComponent,
        SignupCardComponent,
        TranslocoModule,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @Select(SystemState.signUpEnabled) signUpEnabled$!: Observable<boolean>;
    $signUpEnabled = toSignal(this.signUpEnabled$);

    constructor(
        tokenService: TokenService,
        private store: Store,
    ) {
        tokenService.deleteToken();
        this.store.dispatch(new UiActions.ChangeSidenavVisibility(false));
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new UiActions.ChangePageTitle(undefined));
        this.store.dispatch(new UiActions.ChangePageSubtitle(undefined));

        this.store.dispatch(new SystemActions.LoadSystemInfo());
    }
}
