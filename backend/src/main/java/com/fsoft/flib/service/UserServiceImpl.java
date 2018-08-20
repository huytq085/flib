package com.fsoft.flib.service;

import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public boolean save(UserEntity userEntity) {
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        if (userRepository.save(userEntity) != null || userEntity.equals(userRepository.save(userEntity))) {
            return true;
        }
        return false;
    }

    @Override
    public boolean update(UserEntity userEntity) {
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        if(userRepository.findById(userEntity.getId()) != null){
            userRepository.save(userEntity);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        UserEntity userEntity = userRepository.findById(id);
        userRepository.delete(userEntity);
        if(userRepository.findById(id) == null){
            return true;
        }
        return false;
    }

    @Override
    public List<UserEntity> getAll() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getOne(int userId) {
        return userRepository.findById(userId);
    }

//    return true if user exist in db
    @Override
    public boolean checkLogin(UserEntity userEntity) {
        if(userRepository.findById(userEntity.getId())!= null){
            return true;
        }
        return false;
    }
}
