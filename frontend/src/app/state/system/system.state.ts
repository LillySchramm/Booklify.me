import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { SystemInfoDto, SystemService } from 'src/app/api';
import { SystemActions } from './system.actions';

interface SystemStateModel {
    systemInfo?: SystemInfoDto;
}

@State<SystemStateModel>({
    name: 'system',
    defaults: {},
})
@Injectable()
export class SystemState {
    constructor(private readonly system: SystemService) {}

    @Action(SystemActions.LoadSystemInfo)
    loadSystemInfo({ dispatch }: StateContext<SystemStateModel>) {
        return this.system
            .systemControllerGetSystemInfo()
            .pipe(
                tap((systemInfo) =>
                    dispatch(
                        new SystemActions.LoadSystemInfoSuccess(systemInfo),
                    ),
                ),
            );
    }

    @Action(SystemActions.LoadSystemInfoSuccess)
    loadSystemInfoSuccess(
        { patchState }: StateContext<SystemStateModel>,
        { payload }: SystemActions.LoadSystemInfoSuccess,
    ) {
        patchState({
            systemInfo: payload,
        });
    }

    @Selector()
    static signUpEnabled(state: SystemStateModel): boolean {
        return state.systemInfo?.signUpEnabled ?? true;
    }

    @Selector()
    static recaptchaEnabled(state: SystemStateModel): boolean {
        return state.systemInfo?.recaptcha.enabled ?? false;
    }

    @Selector()
    static recaptchaSiteKey(state: SystemStateModel): string {
        return state.systemInfo?.recaptcha.siteKey ?? '';
    }
}
