export * from './auth.service';
export * from './authors.service';
export * from './bookGroups.service';
export * from './books.service';
export * from './publishers.service';
export * from './reports.service';
export * from './system.service';
export * from './users.service';
import { AuthService } from './auth.service';
import { AuthorsService } from './authors.service';
import { BookGroupsService } from './bookGroups.service';
import { BooksService } from './books.service';
import { PublishersService } from './publishers.service';
import { ReportsService } from './reports.service';
import { SystemService } from './system.service';
import { UsersService } from './users.service';
export const APIS = [
    AuthService,
    AuthorsService,
    BookGroupsService,
    BooksService,
    PublishersService,
    ReportsService,
    SystemService,
    UsersService,
];
