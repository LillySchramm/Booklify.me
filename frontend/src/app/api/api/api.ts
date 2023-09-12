export * from './auth.service';
export * from './authors.service';
export * from './bookGroups.service';
export * from './books.service';
import { AuthService } from './auth.service';
import { AuthorsService } from './authors.service';
import { BookGroupsService } from './bookGroups.service';
import { BooksService } from './books.service';
export const APIS = [
    AuthService,
    AuthorsService,
    BookGroupsService,
    BooksService,
];
