export * from './auth.service';
import { AuthService } from './auth.service';
export * from './general.service';
import { GeneralService } from './general.service';
export const APIS = [AuthService, GeneralService];
