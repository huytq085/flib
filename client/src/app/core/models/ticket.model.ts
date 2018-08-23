import { Book } from './../../model/book.model';
export class Ticket {
    id?: number;
    books: Book[];
    dateAdded: string;
    status: number;
}