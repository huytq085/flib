package com.fsoft.flib.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "book_type", schema = "flib")
@IdClass(BookTypeEntityPK.class)
public class BookTypeEntity {
    private int bookId;
    private int typeId;
    private BookEntity bookByBookId;
    private TypeEntity typeByTypeId;

    @Id
    @Column(name = "book_id", nullable = false)
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    @Id
    @Column(name = "type_id", nullable = false)
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
        BookTypeEntity that = (BookTypeEntity) o;
        return bookId == that.bookId &&
                typeId == that.typeId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, typeId);
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
    @JoinColumn(name = "type_id", referencedColumnName = "id", nullable = false, insertable = false, updatable = false)
    public TypeEntity getTypeByTypeId() {
        return typeByTypeId;
    }

    public void setTypeByTypeId(TypeEntity typeByTypeId) {
        this.typeByTypeId = typeByTypeId;
    }
}
