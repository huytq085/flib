package com.fsoft.flib.domain;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class TicketDetailEntityPK implements Serializable {
    private int bookId;
    private int ticketId;

    @Column(name = "book_id", nullable = false)
    @Id
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    @Column(name = "ticket_id", nullable = false)
    @Id
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TicketDetailEntityPK that = (TicketDetailEntityPK) o;
        return bookId == that.bookId &&
                ticketId == that.ticketId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, ticketId);
    }
}
