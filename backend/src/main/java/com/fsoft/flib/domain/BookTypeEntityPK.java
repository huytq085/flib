package com.fsoft.flib.domain;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class BookTypeEntityPK implements Serializable {
    private int bookId;
    private int typeId;

    @Column(name = "book_id", nullable = false)
    @Id
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    @Column(name = "type_id", nullable = false)
    @Id
    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BookTypeEntityPK that = (BookTypeEntityPK) o;
        return bookId == that.bookId &&
                typeId == that.typeId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, typeId);
    }
}
