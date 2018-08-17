package com.fsoft.flib.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "ticket_detail", schema = "flib")
@IdClass(TicketDetailEntityPK.class)
public class TicketDetailEntity {
    private int bookId;
    private int ticketId;
    private int amount;
    private BookEntity bookByBookId;
    private TicketEntity ticketByTicketId;

    @Id
    @Column(name = "book_id", nullable = false)
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    @Id
    @Column(name = "ticket_id", nullable = false)
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    @Basic
    @Column(name = "amount", nullable = false)
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TicketDetailEntity that = (TicketDetailEntity) o;
        return bookId == that.bookId &&
                ticketId == that.ticketId &&
                amount == that.amount;
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, ticketId, amount);
    }

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    public BookEntity getBookByBookId() {
        return bookByBookId;
    }

    public void setBookByBookId(BookEntity bookByBookId) {
        this.bookByBookId = bookByBookId;
    }

    @ManyToOne
    @JoinColumn(name = "ticket_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    public TicketEntity getTicketByTicketId() {
        return ticketByTicketId;
    }

    public void setTicketByTicketId(TicketEntity ticketByTicketId) {
        this.ticketByTicketId = ticketByTicketId;
    }
}
