import {
    BookDto,
    BookGroupListDto,
    BookListDto,
    SetOwnershipStatusDto,
} from 'src/app/api';

export namespace BookActions {
    export class LoadBooksOfUser {
        static readonly type = '[Books] Load Books of User';
        constructor(public id: string) {}
    }

    export class LoadBooksOfUserSuccess {
        static readonly type = '[Books] Load Books of User Success';
        constructor(public books: BookListDto) {}
    }

    export class LoadBooksOfUserFail {
        static readonly type = '[Books] Load Books of User Fail';
        constructor(public error: string) {}
    }

    export class LoadBookGroupsOfUser {
        static readonly type = '[Books] Load Book Groups of User';
        constructor(public id: string) {}
    }

    export class LoadBookGroupsOfUserSuccess {
        static readonly type = '[Books] Load Book Groups of User Success';
        constructor(public groups: BookGroupListDto) {}
    }

    export class LoadBookGroupsOfUserFail {
        static readonly type = '[Books] Load Book Groups of User Fail';
        constructor(public error: string) {}
    }

    export class SelectBook {
        static readonly type = '[Books] Select Book';
        constructor(public id: string | undefined) {}
    }

    export class SearchBooks {
        static readonly type = '[Books] Search Book';
        constructor(public isbn: string) {}
    }

    export class SearchBooksSuccess {
        static readonly type = '[Books] Search Book Success';
        constructor(public book: BookDto) {}
    }

    export class SearchBooksFail {
        static readonly type = '[Books] Search Book Fail';
        constructor(public error: string) {}
    }

    export class ChangeOwnership {
        static readonly type = '[Books] Change Ownership';
        constructor(
            public bookId: string,
            public payload: SetOwnershipStatusDto,
        ) {}
    }
    export class ChangeOwnershipSuccess {
        static readonly type = '[Books] Change Ownership Success';
    }

    export class SetFilter {
        static readonly type = '[Books] Set Filter';
        constructor(public filter: string | undefined) {}
    }
}
