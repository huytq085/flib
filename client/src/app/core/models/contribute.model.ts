import { Book } from "./book.model";
import { User } from ".";

export class Contribute{
    id?: number;
    bookByBookId: Book;
    userByUserId: User;
    status: number;
}