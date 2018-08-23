package com.fsoft.flib.service;

import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.repository.UserRepository;
import com.fsoft.flib.repository.UserRolesRepository;
import com.fsoft.flib.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRolesRepository userRolesRepository;

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
        if (userRepository.findById(userEntity.getId()) != null) {
            userRepository.save(userEntity);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(int id) {
        UserEntity userEntity = userRepository.findById(id);
        userRepository.delete(userEntity);
        if (userRepository.findById(id) == null) {
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
    public boolean checkLogin(UserEntity userLogin) {
        UserEntity userReg = userRepository.findByEmail(userLogin.getEmail());
        if (userReg != null) {
            if (passwordEncoder.matches(userLogin.getPassword(), userReg.getPassword())) {
                return true;
            }
            return false;
        }
        return false;
    }

    @Override
    public List<GrantedAuthority> getAuthorities(UserEntity userEntity){
        List<String> roleNames = userRolesRepository.getRoleNameByEmail(userEntity.getEmail());
        System.out.println("role names");
        System.out.println(JsonUtil.encode(roleNames));
        List<GrantedAuthority> grantList = new ArrayList<>();
        if (roleNames != null) {
            for (String role : roleNames) {
                // ROLE_USER, ROLE_ADMIN,..
                GrantedAuthority authority = new SimpleGrantedAuthority(role);
                grantList.add(authority);
            }
        }
        return grantList;
    }

    @Override
    public UserEntity getByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}