package com.fsoft.flib.service;

import com.fsoft.flib.domain.UserEntity;
import com.fsoft.flib.domain.UserRoleEntity;
import com.fsoft.flib.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserDetailServiceImp implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        if (s == null) {
            throw new UsernameNotFoundException("User not found");
        }
        UserEntity userEntity = userRepository.findByEmail(s);
        Set<GrantedAuthority> grantedAuthoritySet = new HashSet<>();
        Collection<UserRoleEntity> roles = userEntity.getUserRolesById();
        for (UserRoleEntity role : roles) {
            grantedAuthoritySet.add(new SimpleGrantedAuthority(role.getRoleByRoleId().getName()));
        }
        return new org.springframework.security.core.userdetails.User(userEntity.getEmail(), userEntity.getPassword(), grantedAuthoritySet);
    }
}
