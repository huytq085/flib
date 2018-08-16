package com.fsoft.flib.domain;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class TicketEntityPK implements Serializable {
    private int id;
    private int userId;

    @Column(name = "id", nullable = false)
    @Id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
        TicketEntityPK that = (TicketEntityPK) o;
        return id == that.id &&
                userId == that.userId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId);
    }
}
