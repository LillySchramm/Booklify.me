import { Controller, Get, Route, Tags } from 'tsoa';
import { FrontendConfig } from '../models/config.model';
import { PingResponse } from '../models/ping.model';
import { GITHUB_CLIENT_ID } from '../tools/config';

@Route('v1/config')
@Tags('General')
export class ConfigController extends Controller {
    /**
     * Returns config information for the frontend
     */
    @Get('/')
    public async config(): Promise<FrontendConfig> {
        return { GITHUB_CLIENT_ID: GITHUB_CLIENT_ID || '' };
    }
}
