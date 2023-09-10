import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UiActions } from './ui.actions';

interface UiStateModel {
    isSidenavVisible: boolean;
    pageTitle?: string;
}

@State<UiStateModel>({
    name: 'ui',
    defaults: {
        isSidenavVisible: false,
    },
})
@Injectable()
export class UiState {
    @Action(UiActions.ChangeSidenavVisibility)
    changeSidenavVisibility(
        { getState, setState }: StateContext<UiStateModel>,
        { payload }: UiActions.ChangeSidenavVisibility,
    ) {
        const state = getState();
        setState({
            ...state,
            isSidenavVisible: payload,
        });
    }

    @Action(UiActions.ChangePageTitle)
    changePageTitle(
        { getState, setState }: StateContext<UiStateModel>,
        { payload }: UiActions.ChangePageTitle,
    ) {
        const state = getState();
        setState({
            ...state,
            pageTitle: payload,
        });
    }

    @Selector()
    static isSidenavVisible(state: UiStateModel) {
        return state.isSidenavVisible;
    }

    @Selector()
    static pageTitle(state: UiStateModel) {
        return state.pageTitle;
    }
}
