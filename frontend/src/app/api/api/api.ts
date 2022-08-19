export * from './auth.service';
import { AuthService } from './auth.service';
export * from './books.service';
import { BooksService } from './books.service';
export * from './general.service';
import { GeneralService } from './general.service';
export const APIS = [AuthService, BooksService, GeneralService];
