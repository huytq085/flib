package com.fsoft.flib.service;

import com.fsoft.flib.domain.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    UserEntity save(UserEntity userEntity);

    UserEntity update(UserEntity userEntity);

    UserEntity delete(UserEntity userEntity);

    List<UserEntity> getAll();

    UserEntity getOne(int userId);
    UserEntity getOne(String email);

}
