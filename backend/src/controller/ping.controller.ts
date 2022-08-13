import { Controller, Get, Request, Route, Security } from 'tsoa';
import { PingResponse } from '../models/ping.model';

@Route('v1/ping')
@Security('bearer')
export class PingController extends Controller {
    /**
     * A simple ping.
     */
    @Get('/')
    public async ping(@Request() request: any): Promise<PingResponse> {
        return { ping: 'pong' };
    }
}
