import {Author} from './author.model';
import {React} from './react.model';

export class Book {
  id?: number;
  name: string;
  authorByAuthorId: Author;
  rating: number;
  dateAdded: string;
  datePublished: string;
  amount: number;
  description: string;
  coverImage: string;
  reactionsById?: React[];

  // constructor(name: string,
  //             authorId: string,
  //             rating: number,
  //             date_added: string,
  //             date_published: string,
  //             amount: number,
  //             coverImage: string) {
  //   this.name = name;
  //   this.authorId = authorId;
  //   this.rating = rating;
  //   this.date_added = date_added;
  //   this.date_published = date_published;
  //   this.amount = amount;
  //   this.coverImage = coverImage;
  // }
}
