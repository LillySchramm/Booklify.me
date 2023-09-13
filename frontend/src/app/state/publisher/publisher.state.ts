import { Injectable } from '@angular/core';
import {
    Action,
    Selector,
    State,
    StateContext,
    createSelector,
} from '@ngxs/store';
import { tap } from 'rxjs';
import { PublisherDto, PublishersService } from 'src/app/api';
import { PublisherActions } from './publisher.actions';

export interface PublisherMap {
    [key: string]: PublisherDto;
}

interface PublisherStateModel {
    publishers: PublisherMap;
}

@State<PublisherStateModel>({
    name: 'publisher',
    defaults: {
        publishers: {},
    },
})
@Injectable()
export class PublisherState {
    constructor(private readonly publishers: PublishersService) {}

    @Action(PublisherActions.LoadPublishers)
    loadPublishers(
        { getState, dispatch }: StateContext<PublisherStateModel>,
        { payload }: PublisherActions.LoadPublishers,
    ) {
        const state = getState();

        const publishers = payload.filter((id) => !state.publishers[id]);
        if (!publishers.length) {
            return;
        }

        return this.publishers
            .publishersControllerGetPublishers({ ids: payload })
            .pipe(
                tap((publishers) => {
                    dispatch(
                        new PublisherActions.LoadPublishersSuccess(publishers),
                    );
                }),
            );
    }

    @Action(PublisherActions.LoadPublishersSuccess)
    loadPublishersSuccess(
        { patchState }: StateContext<PublisherStateModel>,
        { payload }: PublisherActions.LoadPublishersSuccess,
    ) {
        const publishers = payload.publishers.reduce<PublisherMap>(
            (acc, publisher) => {
                acc[publisher.id] = publisher;
                return acc;
            },
            {},
        );

        patchState({
            publishers: {
                ...publishers,
            },
        });
    }

    @Selector()
    static publishers(state: PublisherStateModel): PublisherMap {
        return state.publishers;
    }

    static publisher(id: string) {
        return createSelector(
            [PublisherState],
            (state: PublisherStateModel) => {
                return state.publishers[id];
            },
        );
    }
}
