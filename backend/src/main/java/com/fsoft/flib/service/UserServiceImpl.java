package com.fsoft.flib.service;

import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.domain.UserRoleEntity;
import com.fsoft.flib.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
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
    public Collection<GrantedAuthority> getAuthorities(UserEntity userEntity){
        Collection<GrantedAuthority> grantedAuthoritySet= new HashSet<>();
        System.out.println("-------------------");
        for (UserRoleEntity u: userEntity.getUserRolesById()){
            System.out.println(u.getRoleId());
        }
        Collection<UserRoleEntity> userRoles= userEntity.getUserRolesById();
        for(UserRoleEntity userRole: userRoles){
            grantedAuthoritySet.add(new SimpleGrantedAuthority(userRole.getRoleByRoleId().getName()));
        }
        return grantedAuthoritySet;
    }
}