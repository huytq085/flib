package com.fsoft.flib.service;

import com.fsoft.flib.domain.ReactionEntity;
import org.springframework.data.domain.Page;

import java.security.Principal;
import java.util.List;


public interface ReactService {
    ReactionEntity create(ReactionEntity reactionEntity, Principal principal);

    ReactionEntity update(ReactionEntity reactionEntity);

    public List<ReactionEntity> getReactsByBookId(int bookId);

//    boolean delete(int id);
//
//    List<UserEntity> getAll();
//
//    UserEntity getOne(int userId);
//
//    boolean checkLogin(UserEntity userEntity);
//
//    List<GrantedAuthority> getAuthorities(UserEntity userEntity);
//
//    UserEntity getByEmail(String email);
//
//    ContributeEntity contributeByEmail(String email, BookEntity book);
//
//    List<UserEntity> search(String query);
}
