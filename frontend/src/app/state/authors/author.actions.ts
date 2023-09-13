import { AuthorListDto } from 'src/app/api';

export namespace AuthorActions {
    export class LoadAuthors {
        static readonly type = '[Authors] Load Authors';
        constructor(public payload: string[]) {}
    }

    export class LoadAuthorsSuccess {
        static readonly type = '[Authors] Load Authors Success';
        constructor(public payload: AuthorListDto) {}
    }
}
