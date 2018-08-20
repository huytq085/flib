package com.fsoft.flib.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "user", schema = "flib", catalog = "")
public class UserEntity {
    private int id;
    private String email;
    private String password;
    private String fullName;
    private String address;
    private String gender;
    private String identityCard;
    private Collection<ContributeEntity> contributesById;
    private Collection<ReactionEntity> reactionsById;
    private Collection<TicketEntity> ticketsById;
    private Collection<UserRoleEntity> userRolesById;

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "email", nullable = false, length = 45)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "password", nullable = false, length = 100)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "full_name", nullable = false, length = 100)
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    @Basic
    @Column(name = "address", nullable = false, length = 100)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "gender", nullable = false, length = 10)
    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Basic
    @Column(name = "identity_card", nullable = false, length = 12)
    public String getIdentityCard() {
        return identityCard;
    }

    public void setIdentityCard(String identityCard) {
        this.identityCard = identityCard;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return id == that.id &&
                Objects.equals(email, that.email) &&
                Objects.equals(password, that.password) &&
                Objects.equals(fullName, that.fullName) &&
                Objects.equals(address, that.address) &&
                Objects.equals(gender, that.gender) &&
                Objects.equals(identityCard, that.identityCard);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, password, fullName, address, gender, identityCard);
    }

    @OneToMany(mappedBy = "userByUserId")
    public Collection<ContributeEntity> getContributesById() {
        return contributesById;
    }

    public void setContributesById(Collection<ContributeEntity> contributesById) {
        this.contributesById = contributesById;
    }

    @OneToMany(mappedBy = "userByUserId")
    public Collection<ReactionEntity> getReactionsById() {
        return reactionsById;
    }

    public void setReactionsById(Collection<ReactionEntity> reactionsById) {
        this.reactionsById = reactionsById;
    }

    @OneToMany(mappedBy = "userByUserId")
    public Collection<TicketEntity> getTicketsById() {
        return ticketsById;
    }

    public void setTicketsById(Collection<TicketEntity> ticketsById) {
        this.ticketsById = ticketsById;
    }

    @OneToMany(mappedBy = "userByUserId")
    public Collection<UserRoleEntity> getUserRolesById() {
        return userRolesById;
    }

    public void setUserRolesById(Collection<UserRoleEntity> userRolesById) {
        this.userRolesById = userRolesById;
    }

    @Transient
    public Set<GrantedAuthority> getAuthorities(){
        Set<GrantedAuthority> grantedAuthoritySet= new HashSet<>();
        Collection<UserRoleEntity> idRoles= getUserRolesById();
        for(UserRoleEntity id: idRoles){
            grantedAuthoritySet.add(new SimpleGrantedAuthority(id.getRoleByRoleId().getName()));
        }
        return grantedAuthoritySet;
    }
}
