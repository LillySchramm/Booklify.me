import { Injectable } from '@angular/core';
import {
    Action,
    Selector,
    State,
    StateContext,
    createSelector,
} from '@ngxs/store';
import { tap } from 'rxjs';
import { AuthorDto, AuthorsService } from 'src/app/api';
import { AuthorActions } from './author.actions';

export interface AuthorMap {
    [key: string]: AuthorDto;
}

interface AuthorStateModel {
    authors: AuthorMap;
}

@State<AuthorStateModel>({
    name: 'authors',
    defaults: {
        authors: {},
    },
})
@Injectable()
export class AuthorState {
    constructor(private readonly authors: AuthorsService) {}

    @Action(AuthorActions.LoadAuthors)
    loadAuthors(
        { getState, dispatch }: StateContext<AuthorStateModel>,
        { payload }: AuthorActions.LoadAuthors,
    ) {
        const state = getState();

        const authors = payload.filter((id) => !state.authors[id]);
        if (!authors.length) {
            return;
        }

        return this.authors.authorsControllerGetAuthors({ ids: payload }).pipe(
            tap((authors) => {
                dispatch(new AuthorActions.LoadAuthorsSuccess(authors));
            }),
        );
    }

    @Action(AuthorActions.LoadAuthorsSuccess)
    loadAuthorsSuccess(
        { patchState }: StateContext<AuthorStateModel>,
        { payload }: AuthorActions.LoadAuthorsSuccess,
    ) {
        const authors = payload.authors.reduce<AuthorMap>((acc, author) => {
            acc[author.id] = author;
            return acc;
        }, {});

        patchState({
            authors: {
                ...authors,
            },
        });
    }

    @Selector()
    static authors(state: AuthorStateModel): AuthorMap {
        return state.authors;
    }

    static author(id: string) {
        return createSelector([AuthorState], (state: AuthorStateModel) => {
            return state.authors[id];
        });
    }
}
