import { Injectable } from '@angular/core';
import {
    Action,
    Selector,
    State,
    StateContext,
    createSelector,
} from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import {
    BookDto,
    BookGroupDto,
    BookGroupsService,
    BookListDto,
    BooksService,
} from 'src/app/api';
import { BookActions } from './books.actions';

export interface BookMap {
    [key: string]: BookDto;
}

export interface BookGroupMap {
    [key: string]: BookGroupDto;
}

interface BookStateModel {
    selectedBook?: string;
    currentCollectionMap?: BookMap;
    currentCollection?: BookListDto;
    currentOwnerId?: string;
    loadingCollection: boolean;
    loadingCollectionError?: string;
    currentGroupMap?: BookGroupMap;
    loadingGroups: boolean;
    loadingGroupsError?: string;
}

@State<BookStateModel>({
    name: 'books',
    defaults: {
        loadingCollection: false,
        loadingGroups: false,
    },
})
@Injectable()
export class BooksState {
    constructor(
        private bookApi: BooksService,
        private bookGroupApi: BookGroupsService,
    ) {}

    @Action(BookActions.LoadBooksOfUser)
    loadBooksOfUser(
        { patchState, getState, dispatch }: StateContext<BookStateModel>,
        { id }: BookActions.LoadBooksOfUser,
    ) {
        const state = getState();

        if (state.currentOwnerId !== id) {
            patchState({
                selectedBook: undefined,
                currentCollectionMap: undefined,
                currentCollection: undefined,
                currentOwnerId: id,
            });
        }

        patchState({
            loadingCollection: true,
            loadingCollectionError: undefined,
        });

        return this.bookApi.booksControllerGetAllOwnedBooks().pipe(
            tap((books) =>
                dispatch(new BookActions.LoadBooksOfUserSuccess(books)),
            ),
            catchError((error) =>
                dispatch(new BookActions.LoadBooksOfUserFail(error)),
            ),
        );
    }

    @Action(BookActions.LoadBooksOfUserSuccess)
    loadBooksOfUserSuccess(
        { patchState }: StateContext<BookStateModel>,
        { books }: BookActions.LoadBooksOfUserSuccess,
    ) {
        const bookMap: BookMap = {};
        books.books = books.books.sort((a, b) => {
            if (!a.title || !b.title) return a.isbn.localeCompare(b.isbn);
            return a.title.localeCompare(b.title);
        });
        books.books.forEach((book) => (bookMap[book.isbn] = book));

        patchState({
            currentCollectionMap: bookMap,
            currentCollection: books,
            loadingCollectionError: undefined,
            loadingCollection: false,
        });
    }

    @Action(BookActions.LoadBooksOfUserFail)
    loadBooksOfUserFail(
        { patchState }: StateContext<BookStateModel>,
        { error }: BookActions.LoadBooksOfUserFail,
    ) {
        patchState({
            currentCollectionMap: undefined,
            currentCollection: undefined,
            loadingCollectionError: error,
            loadingCollection: false,
        });
    }

    @Action(BookActions.LoadBookGroupsOfUser)
    loadBookGroupsOfUser(
        { patchState, getState, dispatch }: StateContext<BookStateModel>,
        { id }: BookActions.LoadBookGroupsOfUser,
    ) {
        const state = getState();

        if (state.currentOwnerId !== id) {
            patchState({
                selectedBook: undefined,
                currentGroupMap: undefined,
                currentOwnerId: id,
            });
        }

        patchState({
            loadingGroups: true,
            loadingGroupsError: undefined,
        });

        return this.bookGroupApi.bookGroupsControllerGetAllBookGroups().pipe(
            tap((groups) =>
                dispatch(new BookActions.LoadBookGroupsOfUserSuccess(groups)),
            ),
            catchError((error) =>
                dispatch(new BookActions.LoadBookGroupsOfUserFail(error)),
            ),
        );
    }

    @Action(BookActions.LoadBookGroupsOfUserSuccess)
    loadBookGroupsOfUserSuccess(
        { patchState }: StateContext<BookStateModel>,
        { groups }: BookActions.LoadBookGroupsOfUserSuccess,
    ) {
        const groupMap: BookGroupMap = {};
        groups.groups.forEach((group) => (groupMap[group.id] = group));

        patchState({
            currentGroupMap: groupMap,
            loadingGroupsError: undefined,
            loadingGroups: false,
        });
    }

    @Action(BookActions.LoadBookGroupsOfUserFail)
    loadBookGroupsOfUserFail(
        { patchState }: StateContext<BookStateModel>,
        { error }: BookActions.LoadBookGroupsOfUserFail,
    ) {
        patchState({
            currentGroupMap: undefined,
            loadingGroupsError: error,
            loadingGroups: false,
        });
    }

    @Action(BookActions.SelectBook)
    selectBook(
        { patchState }: StateContext<BookStateModel>,
        { id }: BookActions.SelectBook,
    ) {
        patchState({
            selectedBook: id,
        });
    }

    @Selector()
    static currentCollection(state: BookStateModel) {
        return state.currentCollection;
    }

    @Selector()
    static currentCollectionMap(state: BookStateModel) {
        return state.currentCollectionMap;
    }

    @Selector()
    static selectedBook(state: BookStateModel) {
        if (!state.selectedBook || !state.currentCollectionMap) {
            return undefined;
        }
        return state.currentCollectionMap[state.selectedBook];
    }

    @Selector()
    static loadingCollection(state: BookStateModel) {
        return state.loadingCollection;
    }

    @Selector()
    static loadingCollectionError(state: BookStateModel) {
        return state.loadingCollectionError;
    }

    static book(id: string) {
        return createSelector([BooksState], (state: BookStateModel) => {
            if (!state.currentCollectionMap) {
                return undefined;
            }
            return state.currentCollectionMap[id];
        });
    }

    @Selector()
    static currentGroupMap(state: BookStateModel) {
        return state.currentGroupMap;
    }

    @Selector()
    static loadingGroups(state: BookStateModel) {
        return state.loadingGroups;
    }

    @Selector()
    static loadingGroupsError(state: BookStateModel) {
        return state.loadingGroupsError;
    }

    static group(id: string) {
        return createSelector([BooksState], (state: BookStateModel) => {
            if (!state.currentGroupMap) {
                return undefined;
            }
            return state.currentGroupMap[id];
        });
    }
}
