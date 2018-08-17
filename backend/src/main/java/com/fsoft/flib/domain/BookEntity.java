package com.fsoft.flib.domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "book", schema = "flib", catalog = "")
public class BookEntity {
    private int id;
    private String name;
    private int authorId;
    private double rating;
    private Timestamp dateAdded;
    private Timestamp datePublished;
    private int amount;
    private AuthorEntity authorByAuthorId;
    private Collection<BookTypeEntity> bookTypesById;
    private Collection<ContributeEntity> contributesById;
    private Collection<ReactionEntity> reactionsById;
    private Collection<TicketDetailEntity> ticketDetailsById;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "name", nullable = false, length = 255)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "author_id", nullable = false)
    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    @Basic
    @Column(name = "rating", nullable = false, precision = 0)
    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    @Basic
    @Column(name = "date_added", nullable = false)
    public Timestamp getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Timestamp dateAdded) {
        this.dateAdded = dateAdded;
    }

    @Basic
    @Column(name = "date_published", nullable = false)
    public Timestamp getDatePublished() {
        return datePublished;
    }

    public void setDatePublished(Timestamp datePublished) {
        this.datePublished = datePublished;
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
        BookEntity that = (BookEntity) o;
        return id == that.id &&
                authorId == that.authorId &&
                Double.compare(that.rating, rating) == 0 &&
                amount == that.amount &&
                Objects.equals(name, that.name) &&
                Objects.equals(dateAdded, that.dateAdded) &&
                Objects.equals(datePublished, that.datePublished);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, authorId, rating, dateAdded, datePublished, amount);
    }

    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    public AuthorEntity getAuthorByAuthorId() {
        return authorByAuthorId;
    }

    public void setAuthorByAuthorId(AuthorEntity authorByAuthorId) {
        this.authorByAuthorId = authorByAuthorId;
    }

    @OneToMany(mappedBy = "bookByBookId")
    public Collection<BookTypeEntity> getBookTypesById() {
        return bookTypesById;
    }

    public void setBookTypesById(Collection<BookTypeEntity> bookTypesById) {
        this.bookTypesById = bookTypesById;
    }

    @OneToMany(mappedBy = "bookByBookId")
    public Collection<ContributeEntity> getContributesById() {
        return contributesById;
    }

    public void setContributesById(Collection<ContributeEntity> contributesById) {
        this.contributesById = contributesById;
    }

    @OneToMany(mappedBy = "bookByBookId")
    public Collection<ReactionEntity> getReactionsById() {
        return reactionsById;
    }

    public void setReactionsById(Collection<ReactionEntity> reactionsById) {
        this.reactionsById = reactionsById;
    }

    @OneToMany(mappedBy = "bookByBookId")
    public Collection<TicketDetailEntity> getTicketDetailsById() {
        return ticketDetailsById;
    }

    public void setTicketDetailsById(Collection<TicketDetailEntity> ticketDetailsById) {
        this.ticketDetailsById = ticketDetailsById;
    }
}
