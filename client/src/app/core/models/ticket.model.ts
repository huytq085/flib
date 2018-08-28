import { TicketDetail } from './ticket-detail.model';

export class Ticket {
    id?: number;
    ticketDetailsById: TicketDetail[];
    dateAdded?: string;
    status?: number;
}
