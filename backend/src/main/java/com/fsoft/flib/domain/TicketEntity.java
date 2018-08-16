package com.fsoft.flib.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "ticket", schema = "flib")
@IdClass(TicketEntityPK.class)
public class TicketEntity {
    private int id;
    private String dateAdded;
    private int userId;
    private UserEntity userByUserId;
    private TicketDetailEntity ticketDetailById;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "dateAdded", nullable = false, length = 45)
    public String getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(String dateAdded) {
        this.dateAdded = dateAdded;
    }

    @Id
    @Column(name = "user_id", nullable = false)
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
        TicketEntity that = (TicketEntity) o;
        return id == that.id &&
                userId == that.userId &&
                Objects.equals(dateAdded, that.dateAdded);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dateAdded, userId);
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
    @JoinColumn(name = "id", referencedColumnName = "ticket_id", nullable = false)
    public TicketDetailEntity getTicketDetailById() {
        return ticketDetailById;
    }

    public void setTicketDetailById(TicketDetailEntity ticketDetailById) {
        this.ticketDetailById = ticketDetailById;
    }
}
