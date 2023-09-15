import { SystemInfoDto } from 'src/app/api';

export namespace SystemActions {
    export class LoadSystemInfo {
        static readonly type = '[System] Load System Info';
        constructor() {}
    }

    export class LoadSystemInfoSuccess {
        static readonly type = '[System] Load System Info Success';
        constructor(public payload: SystemInfoDto) {}
    }
}
