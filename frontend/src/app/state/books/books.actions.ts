import { BookGroupListDto, BookListDto } from 'src/app/api';

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
}
