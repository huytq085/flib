package com.fsoft.flib.service;

import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserEntity save(UserEntity userEntity) {
        return userRepository.save(userEntity);
    }

    @Override
    public UserEntity update(UserEntity userEntity) {
        return null;
    }

    @Override
    public UserEntity delete(UserEntity userEntity) {
        return null;
    }

    @Override
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getOne(int userId) {
        return userRepository.findById(userId);
    }

    @Override
    public UserEntity getOne(String mail) {
        return userRepository.findByEmail(mail);
    }
}
