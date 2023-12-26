import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@ngneat/transloco';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SystemState } from 'src/app/state/system/system.state';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, TranslocoModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
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
}
