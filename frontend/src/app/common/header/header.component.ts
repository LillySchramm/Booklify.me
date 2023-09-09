import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/api';
import { UserState } from 'src/app/state/user/user.state';
import { UserDisplayComponent } from './user-display/user-display.component';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        TranslocoModule,
        RouterModule,
        UserDisplayComponent,
    ],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Select(UserState.currentUser) user$!: Observable<UserDto | undefined>;
    $user = toSignal(this.user$);
}
