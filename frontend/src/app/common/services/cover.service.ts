import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SystemState } from 'src/app/state/system/system.state';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root',
})
export class CoverService {
    @Select(SystemState.cdn) cdn$!: Observable<string>;
    $cdn = toSignal(this.cdn$);

    constructor(private configService: ConfigService) {}

    public getCoverUrl(id: string): string {
        if (this.$cdn()) {
            return `${this.$cdn()}/thumbnails/${id}.png`;
        }

        return `${this.configService.apiUrl()}/books/cover/${id}.png`;
    }
}
