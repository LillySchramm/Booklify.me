import { PublisherListDto } from 'src/app/api';

export namespace PublisherActions {
    export class LoadPublishers {
        static readonly type = '[Publishers] Load Publishers';
        constructor(public payload: string[]) {}
    }

    export class LoadPublishersSuccess {
        static readonly type = '[Publishers] Load Publishers Success';
        constructor(public payload: PublisherListDto) {}
    }
}
