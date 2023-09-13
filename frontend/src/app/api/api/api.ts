export * from './auth.service';
export * from './authors.service';
export * from './bookGroups.service';
export * from './books.service';
export * from './publishers.service';
import { AuthService } from './auth.service';
import { AuthorsService } from './authors.service';
import { BookGroupsService } from './bookGroups.service';
import { BooksService } from './books.service';
import { PublishersService } from './publishers.service';
export const APIS = [
    AuthService,
    AuthorsService,
    BookGroupsService,
    BooksService,
    PublishersService,
];
