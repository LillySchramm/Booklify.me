import { Controller, Get, Request, Route, Security, Tags } from 'tsoa';
import { PingResponse } from '../models/ping.model';

@Route('v1/ping')
@Security('bearer')
@Tags('General')
export class PingController extends Controller {
    /**
     * A simple ping.
     */
    @Get('/')
    public async ping(@Request() request: any): Promise<PingResponse> {
        return { ping: 'pong' };
    }
}
