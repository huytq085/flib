package com.fsoft.flib.domain;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class ContributeEntityPK implements Serializable {
    private int userId;
    private int bookId;

    @Column(name = "user_id", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "book_id", nullable = false)
    @Id
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContributeEntityPK that = (ContributeEntityPK) o;
        return userId == that.userId &&
                bookId == that.bookId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, bookId);
    }
}
