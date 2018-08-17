package com.fsoft.flib.domain;

import javax.persistence.*;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "type", schema = "flib")
public class TypeEntity {
    private int id;
    private String name;
    private Collection<BookTypeEntity> bookTypesById;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TypeEntity that = (TypeEntity) o;
        return id == that.id &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @OneToMany(mappedBy = "typeByTypeId")
    public Collection<BookTypeEntity> getBookTypesById() {
        return bookTypesById;
    }

    public void setBookTypesById(Collection<BookTypeEntity> bookTypesById) {
        this.bookTypesById = bookTypesById;
    }
}
