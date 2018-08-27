package com.fsoft.flib.service;

import com.fsoft.flib.domain.BookEntity;
import com.fsoft.flib.domain.ContributeEntity;
import com.fsoft.flib.domain.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserEntity save(UserEntity userEntity);

    boolean update(UserEntity userEntity);

    boolean delete(int id);

    List<UserEntity> getAll();

    UserEntity getOne(int userId);

    boolean checkLogin(UserEntity userEntity);

    List<GrantedAuthority> getAuthorities(UserEntity userEntity);

    UserEntity getByEmail(String email);

    ContributeEntity contributeByEmail(String email, BookEntity book);
}
