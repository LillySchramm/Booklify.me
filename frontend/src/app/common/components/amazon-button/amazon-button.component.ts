import { Component, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { Select } from '@ngxs/store';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { SystemState } from 'src/app/state/system/system.state';

@Component({
    selector: 'app-amazon-button',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, TranslocoModule],
    templateUrl: './amazon-button.component.html',
    styleUrl: './amazon-button.component.scss',
})
export class AmazonButtonComponent {
    private _url$ = new BehaviorSubject<string>('');
    @Input() set url(value: string) {
        this._url$.next(value);
    }
    get url() {
        return this._url$.value;
    }

    @Select(SystemState.amazonReferralTag) amazonReferralTag$!: Observable<
        string | undefined
    >;
    $amazonReferralTag = toSignal(this.amazonReferralTag$);

    amazonLink$ = combineLatest([this._url$, this.amazonReferralTag$]).pipe(
        map(([url, tag]) => {
            if (tag) {
                return `${url}?tag=${tag}`;
            }
            return url;
        }),
    );
    $amazonLink = toSignal(this.amazonLink$);
}
