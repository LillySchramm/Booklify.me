export * from './auth.service';
import { AuthService } from './auth.service';
export * from './bookGroups.service';
import { BookGroupsService } from './bookGroups.service';
export * from './books.service';
import { BooksService } from './books.service';
export const APIS = [AuthService, BookGroupsService, BooksService];
