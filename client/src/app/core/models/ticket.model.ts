import { TicketDetail } from './ticket-detail.model';
import { User } from './user.model';

export class Ticket {
    id?: number;
    ticketDetailsById: TicketDetail[];
    dateAdded?: string;
    status?: number;
    userByUserId: User;
}
