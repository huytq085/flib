package com.fsoft.flib.domain;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class ReactionEntityPK implements Serializable {
    private int bookId;
    private int userId;

    public ReactionEntityPK(int bookId, int userId) {
        this.bookId = bookId;
        this.userId = userId;
    }

    public ReactionEntityPK() {
    }

    @Column(name = "book_id", nullable = false)
    @Id
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    @Column(name = "user_id", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReactionEntityPK that = (ReactionEntityPK) o;
        return bookId == that.bookId &&
                userId == that.userId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, userId);
    }
}
