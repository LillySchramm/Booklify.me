import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import { ReportsService } from 'src/app/api';
import { SnackBarService } from 'src/app/common/services/snack-bar.service';
import { ReportActions } from './reports.actions';

interface ReportStateModel {
    isLoading: boolean;
    reportDone: number;
}

@State<ReportStateModel>({
    name: 'reports',
    defaults: {
        isLoading: false,
        reportDone: 0,
    },
})
@Injectable()
export class ReportState {
    constructor(
        private reports: ReportsService,
        private snack: SnackBarService,
    ) {}

    @Action(ReportActions.ReportUser)
    reportUser(
        ctx: StateContext<ReportStateModel>,
        action: ReportActions.ReportUser,
    ) {
        ctx.patchState({ isLoading: true });

        return this.reports.reportsControllerCreateReport(action.payload).pipe(
            tap(() => {
                ctx.dispatch(new ReportActions.ReportUserSuccess());
            }),
            catchError((err) =>
                ctx.dispatch(
                    new ReportActions.ReportUserFail(err.error.message),
                ),
            ),
        );
    }

    @Action(ReportActions.ReportUserSuccess)
    reportUserSuccess(ctx: StateContext<ReportStateModel>) {
        ctx.patchState({ isLoading: false, reportDone: Date.now() });
        this.snack.show('User was reported successfully');
    }

    @Action(ReportActions.ReportUserFail)
    reportUserFail(
        ctx: StateContext<ReportStateModel>,
        action: ReportActions.ReportUserFail,
    ) {
        ctx.patchState({ isLoading: false });
        this.snack.show(action.payload);
    }

    @Selector()
    static isLoading(state: ReportStateModel): boolean {
        return state.isLoading;
    }

    @Selector()
    static reportDone(state: ReportStateModel): number {
        return state.reportDone;
    }
}
