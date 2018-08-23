import { Book } from './book.model';
export class Ticket {
    id?: number;
    books: Book[];
    dateAdded: string;
    status: number;
}