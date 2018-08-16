package com.fsoft.flib.domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "contribute", schema = "flib")
@IdClass(ContributeEntityPK.class)
public class ContributeEntity {
    private int userId;
    private int bookId;
    private Timestamp dateAdded;
    private byte status;
    private UserEntity userByUserId;
    private BookEntity bookByBookId;

    @Id
    @Column(name = "user_id", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Id
    @Column(name = "book_id", nullable = false)
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    @Basic
    @Column(name = "dateAdded", nullable = false)
    public Timestamp getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Timestamp dateAdded) {
        this.dateAdded = dateAdded;
    }

    @Basic
    @Column(name = "status", nullable = false)
    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContributeEntity that = (ContributeEntity) o;
        return userId == that.userId &&
                bookId == that.bookId &&
                status == that.status &&
                Objects.equals(dateAdded, that.dateAdded);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, bookId, dateAdded, status);
    }

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    public UserEntity getUserByUserId() {
        return userByUserId;
    }

    public void setUserByUserId(UserEntity userByUserId) {
        this.userByUserId = userByUserId;
    }

    @ManyToOne
    @JoinColumn(name = "book_id", referencedColumnName = "id", nullable = false)
    public BookEntity getBookByBookId() {
        return bookByBookId;
    }

    public void setBookByBookId(BookEntity bookByBookId) {
        this.bookByBookId = bookByBookId;
    }
}
