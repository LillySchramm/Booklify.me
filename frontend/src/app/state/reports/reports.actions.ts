import { CreateReportDto } from 'src/app/api';

export namespace ReportActions {
    export class ReportUser {
        static readonly type = '[Report] Report User';
        constructor(public payload: CreateReportDto) {}
    }

    export class ReportUserSuccess {
        static readonly type = '[Report] Report User Success';
    }

    export class ReportUserFail {
        static readonly type = '[Report] Report User Fail';
        constructor(public payload: string) {}
    }
}
